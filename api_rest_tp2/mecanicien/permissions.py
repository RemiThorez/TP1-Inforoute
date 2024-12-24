from rest_framework import permissions

class EstMecanicien(permissions.BasePermission):

    def has_permission(self, request, view):
        if request.user.is_authenticated:
            return hasattr(request.user, 'mecanicien') 
        return False