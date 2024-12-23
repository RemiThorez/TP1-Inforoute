from django.db import models

# Create your models here.

class Vehicule(models.Model):
    id = models.AutoField(primary_key = True)
    annee = models.IntegerField()
    modele = models.CharField(max_length=50)
    fabricant = models.CharField(max_length=50)
    idClient = models.ForeignKey("Client",on_delete=models.CASCADE)