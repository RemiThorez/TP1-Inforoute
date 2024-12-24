from rest_framework import serializers
from .models import Vehicule

class VehiculeSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Vehicule
        fields = ['id', 'annee', 'modele', 'fabricant', 'idClient']

        
class NouveauVehiculeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicule
        fields = ['id', 'annee', 'modele', 'fabricant', 'idClient']