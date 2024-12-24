from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from .models import Vehicule
from client.models import Client
from client.permissions import EstClient, EstProprietaireVehicule
from mecanicien.models import Mecanicien
from .serializers import VehiculeSerializer

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi


idVehicule = openapi.Parameter('idVehicule', openapi.IN_PATH, description="ID du véhicule", type=openapi.TYPE_INTEGER)

@swagger_auto_schema(
    method='get',
    manual_parameters=[idVehicule],
    responses={200: VehiculeSerializer, 404: "Véhicule non trouvé"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication]) 
@permission_classes([IsAuthenticated])
def obtenirInfoVehicule(requete, idVehicule):
    try:
        vehicule = Vehicule.objects.get(id=idVehicule)
        serializer = VehiculeSerializer(vehicule)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Vehicule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

idClient = openapi.Parameter('idClient', openapi.IN_PATH, description="ID du client", type=openapi.TYPE_INTEGER)

@swagger_auto_schema(
    method='get',
    manual_parameters=[idClient],
    responses={200: VehiculeSerializer(many=True), 500: "Erreur serveur interne"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient])
def obtenirVehiculeClient(requete, idClient):
    try:
        vehicules = Vehicule.objects.filter(idClient=idClient)
        serializer = VehiculeSerializer(vehicules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@swagger_auto_schema(
    method='post',
    request_body=VehiculeSerializer,
    responses={201: VehiculeSerializer, 400: "Bad Request"}
)
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient])
def ajouter(requete):
    data = requete.data
    serializer = VehiculeSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@swagger_auto_schema(
    method='patch',
    request_body=VehiculeSerializer,
    responses={200: VehiculeSerializer, 400: "Bad Request", 404: "Véhicule non trouvé"}
)
@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient, EstProprietaireVehicule])
def modifier(requete):
    try:
        idVehicule = requete.data.get('id')
        if not idVehicule:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        
        vehicule = Vehicule.objects.get(id=idVehicule)

        data = requete.data
        serializer = VehiculeSerializer(vehicule, data=data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Vehicule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@swagger_auto_schema(
    method='delete',
    request_body=VehiculeSerializer,
    responses={200: "Véhicule supprimé", 400: "Bad Request", 404: "Véhicule non trouvé"}
)
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstClient, EstProprietaireVehicule])
def supprimer(requete):
    data = requete.data
    vehicule_id = data.get('id')

    if not vehicule_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        vehicule = Vehicule.objects.get(id=vehicule_id)
        vehicule.delete()
        return Response(status=status.HTTP_200_OK)
    except Vehicule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)