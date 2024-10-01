from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_photo = models.ImageField(null=False, blank=False)

    def __str__(self):
        return self.user.username

class Projects(models.Model):
    name = models.CharField(max_length=300)
    url = models.URLField(unique=True, null=False)
    image = models.ImageField(null=True, blank=True)
    description = models.TextField(null=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.name
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=350)
    description = models.CharField(max_length=350, default='This is a post, thanks')
    content = models.TextField(null=False)
    likes = models.IntegerField(default=0)
    image = models.ImageField(null=True, blank=True, default='default_image.jpg')
    card_image = models.ImageField(null=True, blank=True, default='default_image.jpg')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True, null=True, blank=True)
    id = models.AutoField(primary_key=True, editable=False)

    def __str__(self):
        return self.title

