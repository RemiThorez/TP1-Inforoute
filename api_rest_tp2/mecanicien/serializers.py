from rest_framework import serializers
from .models import Mecanicien

class NouveauMecanicienSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()

    class Meta:
        model = Mecanicien
        fields = ("id","first_name","last_name","username","password","email","tel","adresse")

class MecanicienSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    password = serializers.CharField(source='user.password')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()
    idMecanicien = serializers.IntegerField()

    class Meta:
        model = Mecanicien
        fields = ("id","idMecanicien","first_name","last_name","username","password","email","tel","adresse")


class MecanicienSerializerNoMdp(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    email = serializers.EmailField(source='user.email')
    username = serializers.CharField(source='user.username')
    tel = serializers.CharField()
    adresse = serializers.CharField()

    class Meta:
        model = Mecanicien
        fields = ("id","first_name","last_name","username","email","tel","adresse")