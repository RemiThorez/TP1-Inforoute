from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Rendezvous
from .serializers import RendezvousSerializer

@api_view(['GET'])
def obtenirRendezvousClient(requete, idClient):
    try:
        rendezvous = Rendezvous.objects.filter(idVehicule__client_id=idClient)
        serializer = RendezvousSerializer(rendezvous, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET'])
def obtenirRendezvousMecanicien(requete, idMecanicien):
    try:
        rendezvous = Rendezvous.objects.filter(idMecanicien_id=idMecanicien)
        serializer = RendezvousSerializer(rendezvous, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def ajouter(requete):
    data = requete.data
    serializer = RendezvousSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def modifier(requete):
    data = requete.data
    rendezvous_id = data.get('id')

    if not rendezvous_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        rendezvous = Rendezvous.objects.get(id=rendezvous_id)
        serializer = RendezvousSerializer(rendezvous, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Rendezvous.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['DELETE'])
def supprimer(requete):
    data = requete.data
    rendezvous_id = data.get('id')

    if not rendezvous_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        rendezvous = Rendezvous.objects.get(id=rendezvous_id)
        rendezvous.delete()
        return Response(status=status.HTTP_200_OK)
    except Rendezvous.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)