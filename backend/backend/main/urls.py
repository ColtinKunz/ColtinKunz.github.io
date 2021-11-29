from django.urls import path
from main import views

app_name = "main"

urlpatterns = [path("index/", views.Index.as_view(), name="index")]
