from django.contrib.auth.models import AbstractUser
from django.db import models

from uuid import uuid4


class Base(models.Model):
    id = models.AutoField(primary_key=True, editable=False)
    uuid = models.UUIDField(default=uuid4, editable=False, unique=True)
    time_created = models.DateTimeField(auto_now_add=True)
    last_updated = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        abstract = True

    def delete(self, *args, **kwargs):
        """Prevent the deletion of objects from the database. WARNING: THIS
        DOES NOT AFFECT BULK DELETION METHODS."""

        if "hard" in kwargs and kwargs["hard"] == True:
            return self.hard_delete(*args, **kwargs)
        else:
            self.is_active = False
            return self.save()

    def hard_delete(self, *args, **kwargs):
        """Actually delete an object from the database."""

        if "hard" in kwargs:
            del kwargs["hard"]
        return super().delete(*args, **kwargs)


class User(AbstractUser, Base):
    class Meta:
        db_table = "user"

    def save(self, *args, **kwargs):
        if not self.password.startswith("pbkdf2_sha256$"):
            # teach model to auto-convert passwords iff they aren't encrypted
            from django.contrib.auth.hashers import make_password

            self.password = make_password(self.password)
        super().save(*args, **kwargs)


class Word(Base):
    text = models.CharField(max_length=5, unique=True)

    def __str__(self):
        return self.text
