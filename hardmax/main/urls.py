from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('login/', views.login_view, name='login'),
    path('signup/', views.signup_view, name='signup'),
    path('logout/', views.logout_view, name='logout'),
    path('profile/', views.profile, name='profile'),
    path('maxilla/', views.maxilla, name='maxilla'),
    path('zygomatic/', views.zygomatic, name='zygomatic'),
    path('frontal/', views.frontal, name='frontal'),
    path('temporal/', views.temporal, name='temporal'),
    path('mandible/', views.mandible, name='mandible'),
    path('parietal/', views.parietal, name='parietal'),
] 