from django.contrib import admin
from core.models import Profile, Post, Projects
# Register your models here.
admin.site.register(Profile)
admin.site.register(Projects)

class PostAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'created_at', 'updated_at')
    readonly_fields = ('created_at', 'updated_at') 

admin.site.register(Post, PostAdmin)