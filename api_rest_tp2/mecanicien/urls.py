from django.urls import path,include
from .views import obtenir,ajouter,supprimer,modifier,connexion
from rest_framework import routers

urlpatterns =[
    path(r"obtenir/<int:idClient>",obtenir,name="obtenir"),
    path(r"ajouter/",ajouter,name="ajouter"),
    path(r"supprimer/<int:idClient>",supprimer,name="supprimer"),
    path(r"modifier/",modifier,name="modifier"),
    path(r"connexion/",connexion,name="connexion"),
]