from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
# Test View
@api_view(["GET"])
def hello_world(request):
    message = 'Hello World'

    return HttpResponse(message)