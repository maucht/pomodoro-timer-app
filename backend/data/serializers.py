from rest_framework import serializers
from data.models import Data, OverallStats

class DataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'
    
class StatsSerializer(serializers.ModelSerializer):
    class Meta:
        model = OverallStats
        fields = '__all__'