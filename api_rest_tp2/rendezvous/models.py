from django.db import models

# Create your models here.

class Rendezvous(models.model):
    id = models.AutoField(primary_key=True)
    idVehicule = models.ForeignKey("Vehicule",on_delete=models.CASCADE)
    idMecanicien = models.ForeignKey("Mecanicien", on_delete=models.CASCADE)
    besoins = models.TextField()
    etat = models.BooleanField()
    confirmer = models.BooleanField()
    date = models.DateField()
    heure = models.IntegerField()
    duree = models.IntegerField()
    commentaire = models.TextField()
    