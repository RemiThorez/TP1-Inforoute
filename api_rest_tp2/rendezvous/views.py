from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Rendezvous
from client.models import Client
from client.permissions import EstClient
from mecanicien.permissions import EstMecanicien
from mecanicien.models import Mecanicien
from .serializers import RendezvousSerializer,NouveauRendezvousSerializer

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


idClient = openapi.Parameter('idClient', openapi.IN_PATH, description="ID du client", type=openapi.TYPE_INTEGER)

@swagger_auto_schema(
    method='get',
    manual_parameters=[idClient],
    responses={200: RendezvousSerializer(many=True), 500: "Erreur serveur interne"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient])
def obtenirRendezvousClient(requete, idClient):
    try:
        rendezvous = Rendezvous.objects.filter(idVehicule__client_id=idClient)
        serializer = RendezvousSerializer(rendezvous, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

idMecanicien = openapi.Parameter('idMecanicien', openapi.IN_PATH, description="ID du mécanicien", type=openapi.TYPE_INTEGER)

@swagger_auto_schema(
    method='get',
    manual_parameters=[idMecanicien],
    responses={200: RendezvousSerializer(many=True), 500: "Erreur serveur interne"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstMecanicien])
def obtenirRendezvousMecanicien(requete, idMecanicien):
    try:
        rendezvous = Rendezvous.objects.filter(idMecanicien_id=idMecanicien)
        serializer = RendezvousSerializer(rendezvous, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@swagger_auto_schema(
    method='post',
    request_body=NouveauRendezvousSerializer,
    responses={201: RendezvousSerializer, 400: "Bad Request"}
)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient])
def ajouter(requete):
    data = requete.data
    serializer = NouveauRendezvousSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='patch',
    request_body=RendezvousSerializer,
    responses={200: RendezvousSerializer, 400: "Bad Request", 404: "Rendez-vous non trouvé"}
)
@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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

@swagger_auto_schema(
    method='delete',
    request_body=RendezvousSerializer,
    responses={200: "Rendez-vous supprimé", 400: "Bad Request", 404: "Rendez-vous non trouvé"}
)
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
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