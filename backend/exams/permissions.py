from rest_framework.permissions import BasePermission

class IsAdminAPIKey(BasePermission):
    def has_permission(self, request, view):
        api_key = request.headers.get('X-API-KEY')
        return api_key == "SUPERSECRET123"  # replace with your admin key
