from django.urls import path
from core.views import hello_world

urlpatterns = [
    path("", hello_world, name='hello'),
]