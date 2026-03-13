import os
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from routes import router
from models import engine, Base, init_db, seed_data

app = FastAPI()


@app.middleware("http")
async def normalize_api_prefix(request: Request, call_next):
    if request.scope.get("path", "").startswith("/api/"):
        request.scope["path"] = request.scope["path"][4:] or "/"
    return await call_next(request)

app.include_router(router)

@app.on_event("startup")
async def startup_event():
    # Create tables and seed data if needed
    Base.metadata.create_all(bind=engine)
    seed_data()

@app.get("/health", response_model=dict)
async def health_check():
    return {"status": "ok"}

@app.get("/", response_class=HTMLResponse)
async def root():
    html = """
    <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <title>GardenBreak API</title>
        <style>
            body {background:#121212;color:#e0e0e0;font-family:Arial,Helvetica,sans-serif;padding:2rem;}
            a {color:#4fd1c5;}
            .container {max-width:800px;margin:auto;}
            h1 {color:#4fd1c5;}
            ul {list-style:none;padding:0;}
            li {margin:0.5rem 0;}
            .endpoint {font-weight:bold;}
        </style>
    </head>
    <body>
        <div class='container'>
            <h1>GardenBreak Backend</h1>
            <p>One‑tap micro‑break habit tracker with a living‑garden UI.</p>
            <h2>Available Endpoints</h2>
            <ul>
                <li><span class='endpoint'>GET</span> /health – health check</li>
                <li><span class='endpoint'>GET</span> /load – retrieve all habit seeds</li>
                <li><span class='endpoint'>POST</span> /save – replace habit list</li>
                <li><span class='endpoint'>POST</span> /plan – AI‑generated habit plan (query, preferences)</li>
                <li><span class='endpoint'>POST</span> /insights – AI insights for selected habit</li>
            </ul>
            <p>Docs: <a href="/docs">OpenAPI</a> | <a href="/redoc">ReDoc</a></p>
            <h2>Tech Stack</h2>
            <ul>
                <li>FastAPI 0.115.0</li>
                <li>PostgreSQL via SQLAlchemy</li>
                <li>DigitalOcean Serverless Inference (openai-gpt-oss-120b)</li>
            </ul>
        </div>
    </body>
    </html>
    """
    return HTMLResponse(content=html, status_code=200)
