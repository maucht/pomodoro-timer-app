from django.db import models

class Data(models.Model):
    workTime = models.CharField(max_length=20)
    breakTime = models.CharField(max_length=20)

