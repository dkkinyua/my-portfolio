from django.urls import path
from core.views import hello_world, get_all_posts, get_post

urlpatterns = [
    path("", hello_world, name='hello'),
    path("posts/", get_all_posts, name='all-posts'),
    path("posts/<int:pk>/", get_post, name="post"),
]