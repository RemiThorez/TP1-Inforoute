from rest_framework import serializers
from .models import Mecanicien

class MecanicienSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mecanicien
        fields = ("id","first_name","last_name","password","email","tel","adresse")