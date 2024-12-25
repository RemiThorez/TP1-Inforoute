from rest_framework import serializers
from .models import Rendezvous

class RendezvousSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Rendezvous
        fields = ('id','idVehicule','idMecanicien','besoins','etat','confirmer','date','heure','duree','commentaire','estPayer','cout')

class EnvoiInfoRendezvousSerializer(serializers.ModelSerializer):
    client = serializers.CharField(source="idVehicule.client.nom")
    mecanicien = serializers.CharField(source="idMecanicien.nom")
    infoVehicule = serializers.SerializerMethodField()
    idClient = serializers.IntegerField(source="idVehicule.client.id")
    class Meta:
        model = Rendezvous
        fields = ('id','idClient','client','mecanicien','infoVehicule','idVehicule','idMecanicien','besoins','etat','confirmer','date','heure','duree','commentaire','estPayer','cout')

    def get_infoVehicule(self, obj):
        vehicule = obj.idVehicule
        return f"{vehicule.annee} {vehicule.fabricant} {vehicule.modele}"

class NouveauRendezvousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rendezvous
        fields = ('id','idVehicule','idMecanicien','besoins','etat','confirmer','date','heure','duree','commentaire','estPayer','cout')