from django.conf import settings

from main.tests import (
    view_template,
    get_access_token,
    user_with_password,
    user,
    anon,
)
from jwt_auth import views

from pytest import mark
from mixer.backend.django import mixer


@mark.django_db
class TestObtainPairView:
    def test_authentication(self, user_with_password):
        """Test getting a token pair when unauthenticated."""

        url, view = "jwt_auth:token_obtain_pair", views.ObtainPairView.as_view()
        user = user_with_password
        response = view_template(
            user,
            url,
            view,
            200,
            "post",
            request_data={"username": user.username, "password": "password"},
        )

        auth_cookie = response.cookies.get("Authorization")
        assert auth_cookie is not None
        assert (
            "Set-Cookie" in f"{auth_cookie}" and "Bearer " in f"{auth_cookie}"
        )

        # check that we fail when we don't have the right password
        response = view_template(
            user,
            url,
            view,
            401,
            "post",
            request_data={
                "username": user.username,
                "password": "wrong password",
            },
        )
        assert response.cookies.get("Authorization") is None


@mark.django_db
class TestVerifyView:
    def test_verify_access_token(self, user):
        """Test checking that an access token is currently valid."""

        url, view = "jwt_auth:token_verify", views.VerifyView.as_view()
        access_token = get_access_token(user)

        response = view_template(
            user,
            url,
            view,
            200,
            "post",
            cookies={"Authorization": f"Bearer {access_token}"},
        )

        # test again with invalid token
        response = view_template(
            user,
            url,
            view,
            401,
            "post",
            cookies={"Authorization": f"Bearer {access_token[::-1]}"},
        )

    def test_verify_refresh_token(self, user):
        """Test checking that a refresh token is currently valid."""

        url, view = "jwt_auth:token_verify", views.VerifyView.as_view()
        refresh_token = get_access_token(user, refresh=True)

        response = view_template(
            user,
            url,
            view,
            200,
            "post",
            view_args={"token_type": "refresh"},
            cookies={"RefreshAuthorization": refresh_token},
        )

        # test again with invalid token
        response = view_template(
            user,
            url,
            view,
            400,
            "post",
            cookies={"RefreshAuthorization": refresh_token[::-1]},
            enforce_expected_status=False,
        )


@mark.django_db
class TestRefreshView:
    def test_refresh(self, user):
        """Test that we can get a new access token from a refresh token."""

        url, view = "jwt_auth:token_refresh", views.RefreshView.as_view()
        refresh_token = get_access_token(user, refresh=True)

        response = view_template(
            user,
            url,
            view,
            200,
            "post",
            cookies={"RefreshAuthorization": refresh_token},
        )
        assert "detail" in response.data
        assert "Set-Cookie" in str(response.cookies) and "Bearer " in str(
            response.cookies
        )

        # test that we don't get a new access token from an invalid refresh
        # token
        response = view_template(
            user,
            url,
            view,
            401,
            "post",
            cookies={"RefreshAuthorization": refresh_token[::-1]},
        )


@mark.django_db
class TestLogoutView:
    def test_logout_authenticated(self, user):
        """Test that we can appropriately log out."""

        url, view = "jwt_auth:token_clear", views.LogoutView.as_view()
        access_token = get_access_token(user)
        refresh_token = get_access_token(user, refresh=True)

        response = view_template(
            user,
            url,
            view,
            200,
            "post",
            cookies={
                "Authorization": f"Bearer {access_token}",
                "RefreshAuthorization": refresh_token,
            },
        )

    def test_logout_unauthenticated(self, anon):
        """Test that we handle for attempted logout while not being
        authenticated"""

        url, view = "jwt_auth:token_clear", views.LogoutView.as_view()

        response = view_template(anon, url, view, 403, "post")
