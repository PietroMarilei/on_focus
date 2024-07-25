from django.db import models
from django.contrib.auth.models import User

class StudySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_date = models.DateField()
    duration = models.IntegerField(default=0)
    started_at = models.DateTimeField(null=True, blank=True)
    ended_at = models.DateTimeField(null=True, blank=True)

class SessionTopic(models.Model):
    session = models.ForeignKey(StudySession, on_delete=models.CASCADE, related_name='topics')
    topic_name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
