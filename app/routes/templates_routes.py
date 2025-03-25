from fastapi import APIRouter
from fastapi.templating import Jinja2Templates
from fastapi.responses import HTMLResponse
from fastapi import Request

router = APIRouter()
templates = Jinja2Templates(directory="app/templates")

# Templates

@router.get("/templates", response_class=HTMLResponse)
async def get_template(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Templates",
        "message": "Bem-vindo à integração de Jinja2 com FastAPI!"
    }
    return templates.TemplateResponse("index.html", context)

# User routes

router.get("/login_user", response_class=HTMLResponse)
async def login(request: Request):
    context = {
        "request": request,
        "title": "Login de Usuário",
        "message": "Bem-vindo ao login."
    }
    return templates.TemplateResponse("user/login_user.html", context)

router.get("/reset_password_user", response_class=HTMLResponse)
async def reset_user(request: Request):
    context = {
        "request": request,
        "title": "Redefinir Senha de Usuário",
        "message": "Bem-vindo à redefinição de senha."
    }
    return templates.TemplateResponse("user/reset_user.html", context)

router.get("/create_user", response_class=HTMLResponse)
async def create_user(request: Request):
    context = {
        "request": request,
        "title": "Criar Usuário",
        "message": "Crie um novo usuário."
    }
    return templates.TemplateResponse("user/create_user.html", context)

# Admin routes
@router.get("/login_admin", response_class=HTMLResponse)
async def login_admin(request: Request):
    context = {
        "request": request,
        "title": "Login de Admin",
        "message": "Bem-vindo ao login de administrador."
    }
    return templates.TemplateResponse("admin/login_admin.html", context)

@router.get("/reset_password_admin", response_class=HTMLResponse)
async def reset_admin(request: Request):
    context = {
        "request": request,
        "title": "Redefinir Senha de Admin",
        "message": "Bem-vindo à redefinição de senha do admin."
    }
    return templates.TemplateResponse("admin/reset_admin.html", context)

@router.get("/page_admin", response_class=HTMLResponse)
async def reset_admin(request: Request):
    context = {
        "request": request,
        "title": "Redefinir Senha de Admin",
        "message": "Bem-vindo à página do admin."
    }
    return templates.TemplateResponse("admin/page_admin.html", context)


# Dashboard

@router.get("/dashboard_to_user", response_class=HTMLResponse)
async def dashboard(request: Request):
    context = {
        "request": request,
        "title": "Painel de Administração",
        "message": "Bem-vindo ao dashboard do usuário comum (doador)."
    }
    return templates.TemplateResponse("dashboard/dashboard_to_user.html", context)


@router.get("/dashboard_to_admin", response_class=HTMLResponse)
async def dashboard(request: Request):
    context = {
        "request": request,
        "title": "Painel de Administração",
        "message": "Bem-vindo ao  dashboard do administrador."
    }
    return templates.TemplateResponse("dashboard/dashboard_to_admin.html", context)


# Causes

@router.get("/page_causes", response_class=HTMLResponse)
async def get_causes(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com causas",
    }
    return templates.TemplateResponse("causes/causes_by_user.html", context)

@router.get("/create_causes", response_class=HTMLResponse)
async def get_causes(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com causas",
    }
    return templates.TemplateResponse("causes/create_causes.html", context)


# Donations

@router.get("/donations_to_user", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com doações"
    }
    return templates.TemplateResponse("donations/donations_to_user.html", context)


@router.get("/create_donations", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com doações"
    }
    return templates.TemplateResponse("donations/create_donations.html", context)


@router.get("/delete_donations", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com doações"
    }
    return templates.TemplateResponse("donations/delete_donations.html", context)


@router.get("/donations_to_admin", response_class=HTMLResponse)
async def get_home(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com lista de doações"
    }
    return templates.TemplateResponse("donations/donations_to_admin.html", context)


# Users

@router.get("/login_user", response_class=HTMLResponse)
async def login(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Login",
        "message": "Bem-vindo ao login."
    }
    return templates.TemplateResponse("user/login_user.html", context)

@router.get("/reset_password", response_class=HTMLResponse)
async def get_intro(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com Intro",
        "message": "Bem-vindo ao Intro."
    }
    return templates.TemplateResponse("user/reset_user.html", context)

@router.get("/create_user", response_class=HTMLResponse)
async def get_user(request: Request):
    context = {
        "request": request,
        "title": "FastAPI com User",
        "message": "Bem-vindo ao user."
    }
    return templates.TemplateResponse("user/create_user.html", context)

