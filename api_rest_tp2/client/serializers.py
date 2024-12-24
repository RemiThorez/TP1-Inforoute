from rest_framework import serializers
from .models import Client

class NouveauClientSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()
    class Meta:
        model = Client
        fields = ("id","first_name","last_name","username","password","email","tel","adresse")

class ClientSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()
    idClient = serializers.IntegerField()

    class Meta:
        model = Client
        fields = ("id","idClient","first_name","last_name","username","password","email","tel","adresse")

class ClientSerializerNoMDP(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()

    class Meta:
        model = Client
        fields = ("id","first_name","last_name","username","email","tel","adresse")
