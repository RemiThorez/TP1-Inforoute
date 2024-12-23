from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Mecanicien(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    tel = models.CharField(max_length = 50)
    adresse = models.CharField(max_length = 254)
