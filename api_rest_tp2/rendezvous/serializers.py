from rest_framework import serializers
from .models import Rendezvous

class RendezvousSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()
    class Meta:
        model = Rendezvous
        fields = ('id','idVehicule','idMecanicien','besoins','etat','confirmer','date','heure','duree','commentaire','estPayer','cout')

class NouveauRendezvousSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rendezvous
        fields = ('id','idVehicule','idMecanicien','besoins','etat','confirmer','date','heure','duree','commentaire','estPayer','cout')