from django.urls import path,include
from .views import obtenir,ajouter,supprimer,modifier,connexion
from rest_framework import routers

urlpatterns =[
    path(r"obtenir/<int:idClient>",obtenir,name="obtenir-client"),
    path(r"ajouter/",ajouter,name="ajouter-client"),
    path(r"supprimer/<int:idClient>",supprimer,name="supprimer-client"),
    path(r"modifier/",modifier,name="modifier-client"),
    path(r"connexion/",connexion,name="connexion-client"),
]