from django.db import models
from django.contrib.auth.models import User

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

    def __str__(self):
        return self.name
    
class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=350)
    content = models.TextField(null=False)
    likes = models.IntegerField(default=0)
    image = models.ImageField(null=True, blank=True, default='image.jpg')

    def __str__(self):
        return self.name

