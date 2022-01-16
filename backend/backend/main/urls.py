from django.urls import path
from main import views

app_name = "main"

urlpatterns = [
    path("index/", views.Index.as_view(), name="index"),
    path("update-words/", views.UpdateWordDB.as_view(), name="update-words"),
    path("random-word/", views.RandomWord.as_view(), name="random-word"),
]
