from django.urls import path,include
from .views import obtenirRendezvousClient,obtenirRendezvousMecanicien,ajouter,supprimer,modifier
from rest_framework import routers

urlpatterns =[
    path(r"obtenirRendezvousClient/<int:idClient>",obtenirRendezvousClient,name="obtenirRendezvousClient"),
    path(r"ajouter/",ajouter,name="ajouter-rdv"),
    path(r"supprimer/",supprimer,name="supprimer-rdv"),
    path(r"modifier/",modifier,name="modifier-rdv"),
    path(r"obtenirRendezvousMecanicien/<int:idMecanicien>",obtenirRendezvousMecanicien,name="obtenirRendezvousMecanicien"),
]