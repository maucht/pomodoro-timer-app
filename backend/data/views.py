from data.models import Data
from django.http import JsonResponse
from data.serializers import DataSerializer

def data(request):
    #invoke serializer and return to client
    info = Data.objects.all()
    serializer = DataSerializer(info,many=True)
    return JsonResponse({'data': serializer.data})
