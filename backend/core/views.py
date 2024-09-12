from django.shortcuts import get_object_or_404
from django.http import HttpResponse

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from core.serializers import PostSerializer, ProjectSerializer
from core.models import Post, Projects

# Create your views here.
# Test View
@api_view(["GET"])
def hello_world(request):
    message = 'Hello World'

    return HttpResponse(message)

# Views for our posts
@api_view(["GET"])
def get_all_posts(request):
    posts = Post.objects.all()

    serializer = PostSerializer(posts, many=True)

    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(["GET"])
def get_post(request, pk):
    post = get_object_or_404(Post, id=pk)

    if not post:
        return Response({"detail": "Post not found"}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = PostSerializer(post, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)



