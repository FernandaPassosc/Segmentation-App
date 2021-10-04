from django.contrib import admin
from django.urls import path
from . import views
from django.views.generic import RedirectView
from django.conf.urls import url
from django.conf import settings


# primeiro argumento: o que vai aparaecer na página
# segundo: a view que deve ser chamada
# terceiro: o nome da página
urlpatterns = [
    path("", views.image_upload_view, name= 'home'),
    path("about/", views.about, name= 'about'),
    url(r'^favicon\.ico$',RedirectView.as_view(url='/static/images/favicon.ico')),
]