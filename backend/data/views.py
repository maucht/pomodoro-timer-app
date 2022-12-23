from data.models import Data, OverallStats
from django.http import JsonResponse
from data.serializers import DataSerializer,StatsSerializer

def data(request):
    #invoke serializer and return to client
    info = Data.objects.all()
    serializer = DataSerializer(info,many=True)
    return JsonResponse({'data': serializer.data})


def stats(request):
    info = OverallStats.objects.all()
    serializer = StatsSerializer(info,many = True)
    return JsonResponse({'stats': serializer.stats})
