from django.shortcuts import render
from client.models import Client
from mecanicien.models import Mecanicien
from rendezvous.models import Rendezvous
from vehicule.models import Vehicule
from django.db.models import Count, Sum

# Create your views here.

def statistique(requete):

    nbsClient = Client.objects.count()
    nbsMecanicien = Mecanicien.objects.count()
    nbsRendezvous = Rendezvous.objects.count()
    nbsVehicule = Vehicule.objects.count()

    nbsRdvAnnuler = Rendezvous.objects.filter(etat=False,confirmer = True).count()
    nbsRdvConfirmer = Rendezvous.objects.filter(etat = True,confirmer = True).count()
    nbsRdvEnAttente = Rendezvous.objects.filter(confirmer = False).count()
    nbsRdvPayer = Rendezvous.objects.filter(estPayer = True).count()

    totalPaiments = Rendezvous.objects.filter(estPayer = True).aggregate(total = Sum('cout'))['total'] or 0

    # Envoyer les statistiques au template
    contexte = {
        "nbsClient": nbsClient,
        "nbsMecanicien": nbsMecanicien,
        "nbsRendezvous": nbsRendezvous,
        "nbsVehicule": nbsVehicule,

        "nbsRdvAnnuler": nbsRdvAnnuler,
        "nbsRdvConfirmer": nbsRdvConfirmer,
        "nbsRdvEnAttente": nbsRdvEnAttente,
        "nbsRdvPayer": nbsRdvPayer,

        "totalPaiments": totalPaiments,
    }

    return render(requete, "statistics.html", contexte)