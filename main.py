from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database.database import Base, engine, SessionLocal
from app.routes import user_routes, cause_routes, donation_routes, templates_routes
from app.repositories.user_repository import UserRepository

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*", "Authorization"]
)

app.include_router(user_routes.router, tags=['Users'])
app.include_router(cause_routes.router, tags=['Causes'])
app.include_router(donation_routes.router, tags=['Donations'])
app.include_router(templates_routes.router, tags=['Templates'])


def initialize_admin():
    db = SessionLocal()
    try:
        user_repo = UserRepository(db)
        user_repo.create_admin()
    finally:
        db.close()

initialize_admin()