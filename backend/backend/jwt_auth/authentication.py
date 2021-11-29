from rest_framework_simplejwt.authentication import JWTAuthentication as JWTAuth
from rest_framework import HTTP_HEADER_ENCODING


class JWTAuthentication(JWTAuth):
    def get_header(self, request):
        header = request.COOKIES.get("Authorization", None)
        if isinstance(header, str):  # pragma: no cover
            header = header.encode(HTTP_HEADER_ENCODING)
        return header
