from django.db import models

# Create your models here.
class Rendezvous(models.Model):
    id = models.AutoField(primary_key=True)
    idVehicule = models.ForeignKey("vehicule.Vehicule", on_delete=models.CASCADE)
    idMecanicien = models.ForeignKey("mecanicien.Mecanicien", on_delete=models.CASCADE)
    besoins = models.TextField()
    etat = models.BooleanField(default=False)
    confirmer = models.BooleanField(default=False)
    date = models.DateField()
    heure = models.IntegerField()
    duree = models.IntegerField(null=True)
    commentaire = models.TextField(blank=True)
    cout = models.FloatField(null=True)
    estPayer = models.BooleanField(default=False)
    