from django.db import models
from django.contrib.auth.models import User

class Data(models.Model):
    idKey = models.CharField(max_length=16, default='', unique=True)

    workTime = models.IntegerField(default=0)
    breakTime = models.IntegerField(default=0)

    completedTimers = models.IntegerField(default=0)
    totalDistractions = models.IntegerField(default=0)

    monthlyCompletedTimers = models.IntegerField(default=0)
    monthlyDistractions = models.IntegerField(default=0)

    


