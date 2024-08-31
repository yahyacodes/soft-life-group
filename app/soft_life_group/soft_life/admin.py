from django.contrib import admin
from .models import Service

class ServiceAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'location', 'user', 'created_at')

admin.site.register(Service, ServiceAdmin)
