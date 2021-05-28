from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path("", views.image_upload_view, name= 'home'),
    path("about/", views.about, name= 'about'),
]