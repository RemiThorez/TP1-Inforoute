from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Vehicule
from .serializers import VehiculeSerializer

@api_view(['GET'])
def obtenirInfoVehicule(requete, idVehicule):
    try:
        vehicule = Vehicule.objects.get(id=idVehicule)
        serializer = VehiculeSerializer(vehicule)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Vehicule.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def obtenirVehiculeClient(requete, idClient):
    try:
        vehicules = Vehicule.objects.filter(idClient=idClient)
        serializer = VehiculeSerializer(vehicules, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
def ajouter(requete):
    data = requete.data
    serializer = VehiculeSerializer(data=data)

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
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
    
@api_view(['DELETE'])
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