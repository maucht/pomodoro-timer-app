from django.db import models
from django.contrib.auth.models import User

class Data(models.Model):
    idKey = models.CharField(max_length=16, default='')

    workTime = models.IntegerField(default=0)
    breakTime = models.IntegerField(default=0)

    sessionDistractions = models.IntegerField(default=0)

class OverallStats(models.Model):
    idKey=models.CharField(max_length=16, default='', unique=True)

    completedTimers = models.IntegerField(default=0)
    totalDistractions = models.IntegerField(default=0)

    tenWorkTimeCount = models.IntegerField(default=0)
    fifteenWorkTimeCount = models.IntegerField(default=0)
    twentyWorkTimeCount = models.IntegerField(default=0)
    twentyFiveWorkTimeCount = models.IntegerField(default=0)
    thirtyWorkTimeCount = models.IntegerField(default=0)

    


