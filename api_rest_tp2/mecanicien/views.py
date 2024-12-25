from rest_framework.decorators import api_view,authentication_classes,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from .models import Mecanicien
from mecanicien.permissions import EstMecanicien
from .serializers import MecanicienSerializer,MecanicienSerializerNoMdp,NouveauMecanicienSerializer

from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.utils.timezone import now

from datetime import timedelta

from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
# Create your views here.

idMecanicien = openapi.Parameter('idMecanicien', openapi.IN_PATH, description="ID du Mecanicien", type=openapi.TYPE_INTEGER)
@swagger_auto_schema(
    method='get',
    manual_parameters=[idMecanicien],
    responses={200: MecanicienSerializerNoMdp, 404: "Not found"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtenir(requete,idMecanicien):
    try:
        mecanicien = Mecanicien.objects.get(id=idMecanicien)
        mecanicien_serializer = MecanicienSerializerNoMdp(mecanicien, many=False)
        return Response(mecanicien_serializer.data, status=status.HTTP_200_OK)
    except Mecanicien.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@swagger_auto_schema(
    method='get',
    responses={200: MecanicienSerializerNoMdp, 404: "Not found"}
)
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def obtenir(requete):
    try:
        mecanicien = Mecanicien.objects
        mecanicien_serializer = MecanicienSerializerNoMdp(mecanicien, many=True)
        return Response(mecanicien_serializer.data, status=status.HTTP_200_OK)
    except Mecanicien.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


@swagger_auto_schema(
    method='delete',
    manual_parameters=[idMecanicien],
    responses={204: "Mecanicien supprimer", 404: "Not found"}
)
@api_view(['DELETE'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstMecanicien])
def supprimer(requete,idMecanicien):
    try:
        mecanicien = Mecanicien.objects.get(id=idMecanicien)
        mecanicien.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    except Mecanicien.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
@swagger_auto_schema(
    method='post',
    request_body=openapi.Schema(
        type=openapi.TYPE_OBJECT,
        properties={
            'nomUtilisateur': openapi.Schema(type=openapi.TYPE_STRING, description='Nom d\'utilisateur'),
            'mdp': openapi.Schema(type=openapi.TYPE_STRING, description='Mot de passe')
        },
        required=['nomUtilisateur', 'mdp']
    ),
    responses={
        200: openapi.Response('Token', openapi.Schema(
            type=openapi.TYPE_OBJECT,
            properties={
                'jeton': openapi.Schema(type=openapi.TYPE_STRING, description='Jeton d\'authentification'),
                'expires_in': openapi.Schema(type=openapi.TYPE_INTEGER, description='Durée de validité du jeton'),
                'idMecanicien': openapi.Schema(type=openapi.TYPE_INTEGER, description='ID du cMecanicien')
            }
        )),
        400: "Bad request",
        401: "Unauthorized",
        403: "Forbidden"
    }
)
@api_view(['POST'])
def connexion(requete):
    data = requete.data
    nomUtilisateur = data.get('nomUtilisateur')
    mdp = data.get('mdp')

    if not nomUtilisateur or not mdp:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    utilisateur = authenticate(username=nomUtilisateur, password=mdp)

    if utilisateur is not None:
        estClient = hasattr(utilisateur, 'client')
        estMecanicien = hasattr(utilisateur, 'mecanicien')

        if not (estMecanicien):
            return Response(status=status.HTTP_403_FORBIDDEN)
        
        if estClient:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        jeton, creer = Token.objects.get_or_create(user=utilisateur)

        if not creer:
            jeton_age = now() - jeton.creer
            if jeton_age > timedelta(hours=2):
                jeton.delete()
                jeton = Token.objects.create(user=utilisateur)

        return Response({
            "jeton": jeton.key,
            "expires_in": 7200,
            "idClient": utilisateur.client.id
        }, status=status.HTTP_200_OK)

    return Response(status=status.HTTP_401_UNAUTHORIZED)

@swagger_auto_schema(
    method='patch',
    request_body=MecanicienSerializer,
    operation_description="MAJ du Mecanicien",
    responses={200: "OK", 400: "Bad request", 404: "Mecanicien not found", 500: "Internal Server Error"}
)
@api_view(['PATCH'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, EstMecanicien])
def modifier(requete):
    data = requete.data
    mecanicien_id = data.get('idMecanicien')

    if not mecanicien_id:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        mecanicien = Mecanicien.objects.get(id=mecanicien_id)
        user = mecanicien.user

        username = data.get('username')
        lastname = data.get('last_name')
        firstname = data.get('first_name')
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
            mecanicien.tel = tel
        if adresse:
            mecanicien.adresse = adresse
        mecanicien.save()

        return Response(status=status.HTTP_200_OK)

    except Mecanicien.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
@swagger_auto_schema(
    method='post',
    request_body=NouveauMecanicienSerializer,
    operation_description="Création d'un mecanicien",
    responses={201: "OK", 400: "Bad request", 404: "Mecanicien not found", 500: "Internal Server Error"}
)
@api_view(['POST'])
def ajouter(requete):
    data = requete.data
    username = data.get('username')
    lastname = data.get('last_name')
    firstname = data.get('first_name')
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

        mecanicien = Mecanicien.objects.create(user=user, tel=tel, adresse=adresse)

        return Response(status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)