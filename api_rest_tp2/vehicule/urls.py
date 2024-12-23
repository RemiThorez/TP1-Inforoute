from django.urls import path,include
from .views import obtenirInfoVehicule,obtenirVehiculeClient,ajouter,modifier,supprimer
from rest_framework import routers

urlpatterns =[
    path(r"obtenirInfoVehicule/<int:idVehicule>",obtenirInfoVehicule,name="obtenirInfoVehicule"),
    path(r"ajouter/",ajouter,name="ajouter"),
    path(r"supprimer/",supprimer,name="supprimer"),
    path(r"modifier/",modifier,name="modifier"),
    path(r"obtenirVehiculeClient/<int:idClient>",obtenirVehiculeClient,name="obtenirVehiculeClient"),
]