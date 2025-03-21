from app import models, user, cause, donation
from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request
from fastapi.staticfiles import StaticFiles

models.Base.metadata.create_all(bind=engine)
templates = Jinja2Templates(directory="app/templates")
app = FastAPI()

app.mount("/static", StaticFiles(directory="app/static"), name="static")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


app.include_router(user.router, tags=['Users'])
app.include_router(cause.router, tags=['Causes'])
app.include_router(donation.router, tags=['Donations'])


@app.get("/api/fastapi")
def root():
    return {"message": "Welcome to FastAPI with SQLAlchemy"}


@app.get("/templates", response_class=HTMLResponse)
async def get_template(request: Request):
    context = {
        "request": request,  
        "title": "FastAPI com Templates",
        "message": "Bem-vindo à integração de Jinja2 com FastAPI!"
    }
    return templates.TemplateResponse("index.html", context)

@app.get("/intro", response_class=HTMLResponse)
async def get_intro(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Intro",
        "message" : "Bem-vindo ao Intro."
    }
    return templates.TemplateResponse("intro.html", context)
@app.get("/login", response_class=HTMLResponse)
async def login(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Login",
        "message" : "Bem-vindo ao login."
    }
    return templates.TemplateResponse("login.html", context)


@app.get("/user", response_class=HTMLResponse)
async def get_user(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com User",
        "message": "Bem-vindo ao user."
    }
    return templates.TemplateResponse("user.html", context)

@app.get("/reset", response_class=HTMLResponse)
async def reset(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Reset",
        "message": "Bem-vindo ao reset."
    }
    return templates.TemplateResponse("reset.html", context)

@app.get("/page-causes", response_class=HTMLResponse)
async def get_causes(request: Request): 
    context = {
        "request": request,
        "title": "FastAPI com causas",
    }
    return templates.TemplateResponse("causes.html", context)
@app.get("/page-donations", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com doações"
    }
    return templates.TemplateResponse("donations.html", context)

@app.get("/list_donations", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com lista de doações"
    }
    return templates.TemplateResponse("list_donations.html", context)