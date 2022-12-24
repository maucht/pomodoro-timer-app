from data.models import Data, OverallStats
from django.http import JsonResponse, Http404
from data.serializers import DataSerializer,StatsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST','DELETE'])
def datas(request):
    
    info = Data.objects.all()
    serializer = DataSerializer(info,many=True)
    return JsonResponse({'datas':serializer.data})

def data(request,id):
    try: 
        info = Data.objects.get(pk=id)
    except Data.DoesNotExist:
        raise Http404("Data does not exist")
    serializer = DataSerializer(info)
    return JsonResponse({'data':serializer.info})

def stats(request):
    info = OverallStats.objects.all()
    serializer = StatsSerializer(info,many = True)
    return JsonResponse({'stats': serializer.data})
