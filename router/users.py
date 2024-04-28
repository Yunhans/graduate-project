from fastapi import APIRouter
from starlette.requests import Request
from starlette.responses import RedirectResponse
from starlette.middleware.sessions import SessionMiddleware
from authlib.integrations.starlette_client import OAuth, OAuthError
from fastapi.templating import Jinja2Templates
import os
from dotenv import load_dotenv
from config import GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET

router = APIRouter(
    prefix="/google",
    tags=["google"],
    )

# cuz middleware add to APIRrouter instance "won't" have effect
# so we need to add it to FastAPI instance(app)
def add_middleware(app):
    app.add_middleware(SessionMiddleware, secret_key="add string(any)")

templates = Jinja2Templates(directory="templates")

# 脩的憑證
GOOGLE_REDIRECT_URI = "http://127.0.0.1:8000/auth"


oauth = OAuth()
oauth.register(
    name="google",
    sever_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_id=GOOGLE_CLIENT_ID,
    client_secret=GOOGLE_CLIENT_SECRET,
    redirect_uri=GOOGLE_REDIRECT_URI,
    client_kwargs={"scope": "email openid profile"},
)

@router.get("/")
def index(request: Request):
    user = request.session.get('user')
    if user:
        return RedirectResponse('[to be chosen]')

    return templates.TemplateResponse(
        name="[to be chosen].html",
        context={"request": request, "user": user}
    )


# login (after chick signin with google button) 
@router.get("/login")
async def login(request: Request):
    url = request.url_for('auth')
    return await oauth.google.authorize_redirect(request, url)
    
    
@router.get("/auth")
async def auth_google(request: Request):
    try:
        token = await oauth.google.authorize_access_token(request)
    except OAuthError as e:
        return templates.TemplateResponse(
            name='[to be chosen].html',
            context={'request': request, 'error': e.error}
        )
    user = token.get('userinfo')
    if user:
        request.session['user'] = dict(user)
    return RedirectResponse('[to be chosen]')

# logout
@router.get('/logout')
def logout(request: Request):
    request.session.pop('user')
    request.session.clear()
    return RedirectResponse('/')
    