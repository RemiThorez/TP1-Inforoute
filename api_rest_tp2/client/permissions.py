from rest_framework import permissions

class EstClient(permissions.BasePermission):
    
    def has_permission(self, request, view):

        if request.user.is_authenticated:
            return hasattr(request.user, 'client')
        return False

class EstProprietaireVehicule(permissions.BasePermission):

    def has_object_permission(self, request, view, obj):
        if hasattr(request.user, 'client'):
            return obj.client == request.user.client
        return False