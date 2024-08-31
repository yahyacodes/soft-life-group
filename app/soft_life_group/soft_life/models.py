from django.db import models
from django.contrib.auth.models import User

class Service(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    contact_info = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, null=True, blank=True)
    category = models.CharField(max_length=100)
    opening_hours = models.TimeField(default="09:00")
    closing_hours = models.TimeField(default="17:00")
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(default='fallback.png', blank=True)

    
class Review(models.Model):
    service = models.ForeignKey(Service, related_name="reviews", on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rating = models.IntegerField(default=1)  # Rating from 1 to 5
    comment = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    username = models.CharField(max_length=150, unique=True, null=True, blank=True)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)

    def __str__(self):
        return self.username if self.username else "Anonymous"


class UserRegister(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    is_service_provider = models.BooleanField(default=False)

    def __str__(self):
        return self.user.username

