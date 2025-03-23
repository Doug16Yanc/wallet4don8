from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from database.database import Base, engine
from app.routes import user_routes, cause_routes, donation_routes, templates_routes

Base.metadata.create_all(bind=engine)

app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

app.include_router(user_routes.router, tags=['Users'])
app.include_router(cause_routes.router, tags=['Causes'])
app.include_router(donation_routes.router, tags=['Donations'])
app.include_router(templates_routes.router, tags=['Templates'])


