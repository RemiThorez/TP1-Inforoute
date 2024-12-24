from django.urls import path
from .views import statistique

urlpatterns = [
    path("",statistique,name="statistique")
]
