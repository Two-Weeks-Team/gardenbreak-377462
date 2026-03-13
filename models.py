import os
from sqlalchemy import Column, Integer, String, JSON, create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Resolve DATABASE URL with required rewrites
raw_url = os.getenv("DATABASE_URL", os.getenv("POSTGRES_URL", "sqlite:///./app.db"))
if raw_url.startswith("postgresql+asyncpg://"):
    raw_url = raw_url.replace("postgresql+asyncpg://", "postgresql+psycopg://")
elif raw_url.startswith("postgres://"):
    raw_url = raw_url.replace("postgres://", "postgresql+psycopg://")

# Determine if SSL is needed (non‑localhost and not SQLite)
connect_args = {}
if not raw_url.startswith("sqlite") and "localhost" not in raw_url:
    connect_args["sslmode"] = "require"

engine = create_engine(raw_url, connect_args=connect_args, future=True)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False, future=True)
Base = declarative_base()

class Habit(Base):
    __tablename__ = "gb_habits"
    id = Column(Integer, primary_key=True, index=True)
    habit = Column(String, nullable=False)
    icon = Column(String, default="🌱")
    color = Column(String, default="mint")
    streak = Column(Integer, default=0)
    history = Column(JSON, default=list)  # list of ISO date strings

def init_db():
    Base.metadata.create_all(bind=engine)

def seed_data():
    # Insert sample habits if table empty
    session = SessionLocal()
    try:
        count = session.query(Habit).count()
        if count == 0:
            sample = [
                {
                    "habit": "Morning Run",
                    "icon": "🏃‍♀️",
                    "color": "mint",
                    "streak": 5,
                    "history": ["2024-03-06","2024-03-07","2024-03-08","2024-03-09","2024-03-10"],
                },
                {
                    "habit": "Read 20 pages",
                    "icon": "📚",
                    "color": "lavender",
                    "streak": 12,
                    "history": [
                        "2024-02-27","2024-02-28","2024-02-29","2024-03-01","2024-03-02",
                        "2024-03-03","2024-03-04","2024-03-05","2024-03-06","2024-03-07",
                        "2024-03-08","2024-03-09"
                    ],
                },
            ]
            for s in sample:
                habit = Habit(**s)
                session.add(habit)
            session.commit()
    finally:
        session.close()
