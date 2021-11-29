from pytest import mark
from main import models
from . import user


@mark.django_db
class TestUser:
    def test_delete(self, user):
        """Test soft-deleting a user."""

        assert user.is_active == True
        user.delete()
        assert user.is_active == False

    def test_delete_hard_kwarg(self, user):
        """Test hard-deleting a user via the delete method."""

        assert user.is_active == True
        user.delete(hard=True)
        assert user.id is None
        assert len(models.User.objects.all()) == 0

    def test_hard_delete(self, user):
        """Test hard-deleting a user via the explicit method."""

        assert user.is_active == True
        user.hard_delete()
        assert user.id is None
        assert len(models.User.objects.all()) == 0
