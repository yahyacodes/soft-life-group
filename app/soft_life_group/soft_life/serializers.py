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
    image = serializers.SerializerMethodField()

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
    password = serializers.CharField(write_only=True)
    is_service_provider = serializers.BooleanField()

    class Meta:
        model = UserRegister
        fields = ['id', 'user', 'is_service_provider', 'password']

    def create(self, validated_data):
        # Extract the password from the validated data
        password = validated_data.pop('password')
        is_service_provider = validated_data.pop('is_service_provider')

        # Create the User object
        user = User.objects.create_user(
            username=validated_data.get('user').get('username'),
            email=validated_data.get('user').get('email'),
            password=password
        )

        # Create the UserRegister object
        user_register = UserRegister.objects.create(
            user=user,
            is_service_provider=is_service_provider
        )
        return user_register

    def validate(self, data):
    # Example of adding custom validation logic
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "Email already exists"})
        return data
