from django.shortcuts import render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import redirect
from .forms import SignupForm, LoginForm
from django.contrib import messages
from django.views.decorators.csrf import ensure_csrf_cookie

# Create your views here.

# Home page (requires login)
@login_required(login_url='login')
def home(request):
    return render(request, 'main/home.html')

# Login page
@ensure_csrf_cookie
def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        form = LoginForm(request.POST)
        if form.is_valid():
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                login(request, user)
                return redirect('home')
            else:
                messages.error(request, 'Invalid username or password.')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = LoginForm()
    return render(request, 'main/login.html', {'form': form})

# Signup page
@ensure_csrf_cookie
def signup_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        form = SignupForm(request.POST)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            messages.success(request, 'Account created successfully. Please log in.')
            return redirect('login')
        else:
            messages.error(request, 'Please correct the errors below.')
    else:
        form = SignupForm()
    return render(request, 'main/signup.html', {'form': form})

# Logout view
def logout_view(request):
    logout(request)
    return redirect('login')

# Profile page (requires login)
@login_required(login_url='login')
def profile(request):
    return render(request, 'main/profile.html', {'user': request.user})

# Maxilla page (requires login)
@login_required(login_url='login')
def maxilla(request):
    return render(request, 'main/maxilla.html')

# Zygomatic page (requires login)
@login_required(login_url='login')
def zygomatic(request):
    return render(request, 'main/zygomatic.html')

@login_required
def frontal(request):
    return render(request, 'main/frontal.html')

@login_required
def temporal(request):
    return render(request, 'main/temporal.html')

@login_required
def mandible(request):
    return render(request, 'main/mandible.html')

@login_required
def parietal(request):
    return render(request, 'main/parietal.html')
