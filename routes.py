from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel, Field
from typing import List, Optional
from models import SessionLocal, Habit
from ai_service import call_inference

router = APIRouter()

# Pydantic models for API
class HabitResponse(BaseModel):
    id: int
    habit: str
    icon: str
    color: str
    streak: int
    history: List[str]

class HabitCreate(BaseModel):
    habit: str
    icon: Optional[str] = "🌱"
    color: Optional[str] = "mint"
    streak: Optional[int] = 0
    history: Optional[List[str]] = Field(default_factory=list)

class SavePayload(BaseModel):
    habits: List[HabitCreate]

class PlanRequest(BaseModel):
    query: str
    preferences: Optional[str] = None

class PlanResponse(BaseModel):
    summary: str
    items: list[dict[str, object]]
    score: float

class InsightsRequest(BaseModel):
    selection: str
    context: Optional[str] = None

class InsightsResponse(BaseModel):
    insights: List[str]
    next_actions: List[str]
    highlights: List[str]

# Data endpoints
@router.get("/load", response_model=List[HabitResponse])
async def load_habits():
    session = SessionLocal()
    try:
        habits = session.query(Habit).all()
        return [HabitResponse.from_orm(h) for h in habits]
    finally:
        session.close()

@router.post("/save", response_model=dict)
async def save_habits(payload: SavePayload):
    session = SessionLocal()
    try:
        # Clear existing
        session.query(Habit).delete()
        for h in payload.habits:
            habit = Habit(
                habit=h.habit,
                icon=h.icon,
                color=h.color,
                streak=h.streak,
                history=h.history,
            )
            session.add(habit)
        session.commit()
        return {"status": "saved", "count": len(payload.habits)}
    except Exception as e:
        session.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        session.close()

# AI endpoints
@router.post("/plan", response_model=PlanResponse)
async def generate_plan(req: PlanRequest):
    system_msg = {"role": "system", "content": "You are a habit‑planning assistant. Return a JSON object with keys: summary (string), items (list of habit suggestions), score (a numeric suitability rating)."}
    user_msg = {"role": "user", "content": f"Query: {req.query}\nPreferences: {req.preferences or ''}"}
    result = await call_inference([system_msg, user_msg])
    if "note" in result:
        raise HTTPException(status_code=503, detail=result["note"])
    try:
        return PlanResponse(**result)
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid AI response format")

@router.post("/insights", response_model=InsightsResponse)
async def generate_insights(req: InsightsRequest):
    system_msg = {"role": "system", "content": "You are an analytics assistant. Provide insights, next actions, and highlights for a habit. Return JSON with keys: insights, next_actions, highlights, each a list of strings."}
    user_msg = {"role": "user", "content": f"Habit: {req.selection}\nContext: {req.context or ''}"}
    result = await call_inference([system_msg, user_msg])
    if "note" in result:
        raise HTTPException(status_code=503, detail=result["note"])
    try:
        return InsightsResponse(**result)
    except Exception:
        raise HTTPException(status_code=500, detail="Invalid AI response format")
