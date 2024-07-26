from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class StudySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    session_date = models.DateField(auto_now_add=True)
    duration = models.DurationField(null=True, blank=True)
    started_at = models.DateTimeField(default=timezone.now)
    ended_at = models.DateTimeField(null=True, blank=True)

    def save(self, *args, **kwargs):
        if self.ended_at and self.started_at:
            self.duration = self.ended_at - self.started_at
        super().save(*args, **kwargs)

    @property
    def is_completed(self):
        return self.ended_at is not None

    class Meta:
        indexes = [
            models.Index(fields=['-duration']),
        ]

class SessionTopic(models.Model):
    session = models.ForeignKey(StudySession, on_delete=models.CASCADE, related_name='topics')
    topic_name = models.CharField(max_length=255)
    completed = models.BooleanField(default=False)
