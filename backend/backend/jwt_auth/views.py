from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings


class ObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        """
        Effectivly wraps the TokenObtainPairView from rest_framework_simplejwt
        to teach it how to set cookies instead of return the tokens in response
        data.
        """

        response = super().post(request, *args, **kwargs)
        data = response.data
        if "refresh" in data and "access" in data:
            response.set_cookie(
                key="Authorization",
                value=f'Bearer {data["access"]}',
                httponly=True,
                secure=True,
            )
            response.set_cookie(
                key="RefreshAuthorization",
                value=data["refresh"],
                httponly=True,
                secure=True,
                path=f"/{settings.BASE_URL}/auth".replace("//", "/"),
            )
            response.data = {"detail": "Authentication successful."}
        return response


class VerifyView(TokenVerifyView):
    def post(self, request, *args, token_type=None, **kwargs):
        """
        Effectively wraps the TokenVerifyView from rest_framework_simplejwt to
        teach it to read the token from cookies instead of requiring it in
        request data.
        """

        data = {"token": ""}

        if token_type is None:
            token_type = "access"
        if token_type == "access":
            if (
                token := request.COOKIES.get("Authorization", None)
            ) is not None:
                token = token.split(" ")[1]
            data["token"] = token if token is not None else ""
        if token_type == "refresh":
            token = request.COOKIES.get("RefreshAuthorization", None)
            data["token"] = token if token is not None else ""

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        return Response(serializer.validated_data, status=status.HTTP_200_OK)


class RefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        """
        Effectively wraps the TokenRefreshView from rest_framework_simplejwt to
        teach it to read the token from cookies instead of requiring it in
        request data and set the replaced token as a cookie instead of
        returning it.
        """

        data = {"refresh": ""}

        token = request.COOKIES.get("RefreshAuthorization", None)
        data["refresh"] = token if token is not None else ""

        serializer = self.get_serializer(data=data)
        try:
            serializer.is_valid(raise_exception=True)
        except TokenError as e:
            raise InvalidToken(e.args[0])

        response = Response(
            serializer.validated_data, status=status.HTTP_200_OK
        )
        data = response.data
        if "access" in data:
            response.set_cookie(
                key="Authorization",
                value=f'Bearer {data["access"]}',
                httponly=True,
            )
            response.data = {"detail": "Token refreshed."}
        return response


class LogoutView(APIView):
    def post(self, request, *args, **kwargs):
        """
        Provides a view for removing the authentication cookies from the client
        browser.
        """

        response = Response({"detail": "Session ended."})
        response.set_cookie(
            key="Authorization",
            value="",
            httponly=True,
            secure=True,
        )
        response.set_cookie(
            key="RefreshAuthorization",
            value="",
            httponly=True,
            secure=True,
            path=f"/{settings.BASE_URL}/auth".replace("//", "/"),
        )

        return response
