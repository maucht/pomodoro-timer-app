from data.models import Data, OverallStats
from django.http import JsonResponse, Http404
from data.serializers import DataSerializer,StatsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

@api_view(['GET','POST'])
def datas(request):
    info = Data.objects.all()
    if request.method == 'GET':
        serializer = DataSerializer(info,many=True)
        return Response({'datas':serializer.data})
    elif request.method == 'POST':
        serializer = DataSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'datas':serializer.data})
        return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET','POST','DELETE'])
def data(request,id):
    try: 
        info = Data.objects.get(pk=id)
    except Data.DoesNotExist:
        raise Http404("Data does not exist")
    serializer = DataSerializer(info)

    if request.method == "GET":
        return Response({'data':serializer.data})
    elif request.method == "POST":
        serializer = DataSerializer(info, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'data':serializer.data})
        return Response(serializer.errors)
    elif request.method== "DELETE":
        info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'data':serializer.data})

def stats(request):
    info = OverallStats.objects.all()
    serializer = StatsSerializer(info,many = True)
    return JsonResponse({'stats': serializer.data})
