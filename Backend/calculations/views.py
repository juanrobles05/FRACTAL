from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def test_calculations(request):
    return Response({"message": "Calculations API is ready!"})