from django.urls import path
from core.views import hello_world, get_all_posts, get_post, get_project, get_all_projects, send_contact_email

urlpatterns = [
    path("", hello_world, name='hello'),
    path("posts/", get_all_posts, name='all-posts'),
    path("posts/<int:pk>/", get_post, name="post"),
    path('projects/', get_all_projects, name='all-projects'),
    path('projects/<int:pk>/', get_project, name='project'),
    path('contact-me/', send_contact_email, name='contact-me'),
]