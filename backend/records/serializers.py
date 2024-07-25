from rest_framework import serializers
from .models import StudySession, SessionTopic

class StudySessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudySession
        fields = ['id', 'user', 'session_date', 'duration', 'started_at', 'ended_at']

class SessionTopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = SessionTopic
        fields = ['id', 'session', 'topic_name', 'completed']
