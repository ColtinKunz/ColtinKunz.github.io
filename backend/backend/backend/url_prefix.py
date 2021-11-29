from django.urls import path, include
from django.conf import settings

urlpatterns = [path(settings.BASE_URL.lstrip("/"), include("backend.urls"))]
