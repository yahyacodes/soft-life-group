from rest_framework import viewsets, status, generics
from .models import Service, Review, Profile
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Service, Review
from .serializers import ServiceSerializer, ReviewSerializer, ProfileSerializer, UserSerializer, UserRegisterSerializer
from django.contrib.gis.geos import Point
from rest_framework.views import APIView
from django.contrib.gis.db.models.functions import Distance
import logging

logger = logging.getLogger(__name__)


# views.py
class ServiceViewSet(viewsets.ModelViewSet):
    permission_classes = [AllowAny]
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer

    def get_serializer_context(self):
        return {'request': self.request}
    

class NearbyServicesView(APIView):
    def get(self, request):
        try:
            latitude = float(request.query_params.get('latitude'))
            longitude = float(request.query_params.get('longitude'))
            user_location = Point(longitude, latitude, srid=4326)
            radius = 10  # Radius in kilometers

            # Fetch services within the radius
            nearby_services = Service.objects.annotate(
                distance=Distance('location', user_location)
            ).filter(distance__lte=radius * 1000).order_by('distance')

            serializer = ServiceSerializer(nearby_services, many=True)
            return Response(serializer.data)

        except (TypeError, ValueError) as e:
            return Response({"error": "Invalid latitude or longitude"}, status=400)


class ReviewViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

    def perform_create(self, serializer):
        service = Service.objects.get(id=self.request.data['service'])
        serializer.save(service=service)


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def perform_create(self, serializer):
        serializer.save()


class GeolocationView(APIView):
    def post(self, request):
        latitude = request.data.get('latitude')
        longitude = request.data.get('longitude')
        # Save or process the location data
        return Response({'message': 'Location received'}, status=status.HTTP_200_OK)
    

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer
    

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user_register = serializer.save()
            response_data = {
                'id': user_register.user.id,
                'username': user_register.user.username,
                'email': user_register.user.email,
                'is_service_provider': user_register.is_service_provider
            }
            return Response(response_data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)






