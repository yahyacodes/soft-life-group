from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import NearbyServicesView, ReviewViewSet, ServiceViewSet, ProfileViewSet, GeolocationView, RegisterView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
from django.conf.urls.static import static
from django.conf import settings

from app.soft_life_group.soft_life import views

router = DefaultRouter()
router.register(r'services', ServiceViewSet)
router.register(r'reviews', ReviewViewSet)
router.register(r'profiles', ProfileViewSet, basename='profile')

urlpatterns = [
    path('', include(router.urls)),
    path('geolocation/', GeolocationView.as_view(), name='geolocation'),
    path('nearby/', NearbyServicesView.as_view(), name='nearby_services'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('user-info/', views.user_info, name='user_info'),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
