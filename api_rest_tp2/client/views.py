from django.shortcuts import render
from rest_framework.decorators import api_view
from .models import Client
from .serializers import ClientSerializer

from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
# Create your views here.

@api_view(['GET'])
def obtenir(requete,idClient):
    try:
        client = Client.objects.get(id=idClient)
        client_serializer = ClientSerializer(client, many=False)
        return Response(client_serializer.data, status=status.HTTP_200_OK)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE'])
def supprimer(requete,idClient):
    try:
        client = Client.objects.get(id=idClient)
        client.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@api_view(['POST'])
def connexion(requete): # To do
    return
@api_view(['PATCH'])
def modifier(requete):
    data = requete.data
    client_id = data.get('idClient')

    if not client_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        client = Client.objects.get(id=client_id)
        user = client.user

        username = data.get('username')
        lastname = data.get('lastname')
        firstname = data.get('firstname')
        email = data.get('email')

        if username:
            if User.objects.filter(username=username).exclude(id=user.id).exists():
                return Response(status=status.HTTP_409_CONFLICT)
            user.username = username
        if lastname:
            user.last_name = lastname
        if firstname:
            user.first_name = firstname
        if email:
            user.email = email
        user.save()

        tel = data.get('tel')
        adresse = data.get('adresse')

        if tel:
            client.tel = tel
        if adresse:
            client.adresse = adresse
        client.save()

        return Response(status=status.HTTP_200_OK)

    except Client.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
 
@api_view(['POST'])
def ajouter(requete):
    data = requete.data
    username = data.get('username')
    lastname = data.get('lastname')
    firstname = data.get('firstname')
    password = data.get('password')
    email = data.get('email')
    tel = data.get('tel')
    adresse = data.get('adresse')

    if not all([username, password, email, tel, adresse,firstname,lastname]):
        return Response( status=status.HTTP_400_BAD_REQUEST )

    try:
        if User.objects.filter(username=username).exists():
            return Response(status=status.HTTP_400_BAD_REQUEST)
        user = User.objects.create_user(username=username, password=password, email=email, last_name=lastname,first_name=firstname)

        client = Client.objects.create(user=user, tel=tel, adresse=adresse)

        return Response(status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)