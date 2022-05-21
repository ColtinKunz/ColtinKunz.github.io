from django.urls import path
from shared_calendar import views

app_name = "shared_calendar"

urlpatterns = [path("index/", views.Index.as_view(), name="index")]
