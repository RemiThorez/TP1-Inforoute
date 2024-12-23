from django.db import models
from django.contrib.auth.models import User
# Create your models here.

class Mecanicien(User):
    id = models.AutoField(primary_key=True)
    tel = models.charField(max_length = 50)
    adresse = models.charField(max_length = 254)
