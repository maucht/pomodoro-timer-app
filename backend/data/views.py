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


@api_view(['GET','POST'])
def stats(request):
    info = OverallStats.objects.all()
    if request.method == 'GET':
        serializer = StatsSerializer(info,many=True)
        return Response({'stats':serializer.data})
    elif request.method == 'POST':
        serializer = StatsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'stats':serializer.data})

@api_view(['GET','POST','DELETE','PATCH'])
def stat(request,id):
    try: 
        info = OverallStats.objects.get(pk=id)
    except OverallStats.DoesNotExist:
        raise Http404("Data does not exist")
    serializer = StatsSerializer(info)

    if request.method == "GET":
        return Response({'stat':serializer.data})
    elif request.method == "POST":
        serializer = StatsSerializer(info, data = request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'stat':serializer.data})
        return Response(serializer.errors)
    elif request.method=="PATCH":
        serializer = StatsSerializer(info, data = request.data, partial = True)
        if serializer.is_valid():
            serializer.save()
            return Response({'stat':serializer.data})
        return Response(status=status.HTTP_400_BAD_REQUEST)
    elif request.method== "DELETE":
        info.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response({'stat':serializer.data})
