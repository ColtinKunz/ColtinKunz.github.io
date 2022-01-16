import requests

from random import choice
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from main.aux_lib import all_unique_characters
from main.models.core import Word


class Index(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response("Index found.")


class RandomWord(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        for word in Word.objects.all():
            print(word.text)
        random_word = Word.objects.order_by("?").first()
        return Response(random_word.text)


class UpdateWordDB(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        req = requests.get("https://random-word-api.herokuapp.com/all")
        words = req.json()
        for word in words:
            if len(word) == 5 and all_unique_characters(word):
                Word.objects.get_or_create(text=word)
        return Response("Words updated successfully!")
