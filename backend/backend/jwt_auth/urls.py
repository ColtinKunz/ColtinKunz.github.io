from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from jwt_auth import views

app_name = "jwt_auth"

urlpatterns = [
    path("login/", views.ObtainPairView.as_view(), name="token_obtain_pair"),
    path("logout/", views.LogoutView.as_view(), name="token_clear"),
    path("refresh/", views.RefreshView.as_view(), name="token_refresh"),
    path("verify/", views.VerifyView.as_view(), name="token_verify"),
    path(
        "verify/<str:token_type>/",
        views.VerifyView.as_view(),
        name="token_verify",
    ),
]
