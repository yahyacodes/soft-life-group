from rest_framework import serializers
from .models import Service, Review, Profile, UserRegister
from django.contrib.auth.models import User


class BulkReviewSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        reviews = [Review(**item) for item in validated_data]
        return Review.objects.bulk_create(reviews)

from rest_framework import serializers
from .models import Service, Review

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'service', 'user', 'rating', 'comment', 'created_at']

class ServiceSerializer(serializers.ModelSerializer):
    reviews = ReviewSerializer(many=True, read_only=True)
    average_rating = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()  # Add this line

    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'contact_info', 'location', 'category', 'opening_hours', 'closing_hours', 'reviews', 'average_rating', 'image']

    def get_average_rating(self, obj):
        reviews = obj.reviews.all()
        if reviews.exists():
            return sum([review.rating for review in reviews]) / reviews.count()
        return None  # or return 0 if you prefer

    def get_image(self, obj):
        request = self.context.get('request')
        if obj.image:
            return request.build_absolute_uri(obj.image.url)
        return None



class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'username', 'bio', 'location', 'phone_number', 'avatar']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'email']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    

class UserRegisterSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(write_only=True)
    is_service_provider = serializers.BooleanField()

    class Meta:
        model = UserRegister
        fields = ['id', 'username', 'email', 'password', 'is_service_provider']

    def create(self, validated_data):
        user_data = validated_data.pop('user', {})
        user = User.objects.create_user(
            username=user_data.get('username'),
            email=user_data.get('email'),
            password=validated_data.pop('password')
        )
        user_register = UserRegister.objects.create(user=user, **validated_data)
        return user_register
