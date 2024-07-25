from rest_framework import views, status
from rest_framework.response import Response
from .models import StudySession, SessionTopic
from .serializers import StudySessionSerializer, SessionTopicSerializer
from django.utils import timezone

class StartSessionView(views.APIView):
    def post(self, request):
        session = StudySession.objects.create(
            user=request.user,
            session_date=timezone.now().date(),
            started_at=timezone.now()
        )
        return Response(StudySessionSerializer(session).data, status=status.HTTP_201_CREATED)

class StopSessionView(views.APIView):
    def post(self, request, session_id):
        session = StudySession.objects.get(id=session_id)
        session.ended_at = timezone.now()
        session.duration = (session.ended_at - session.started_at).total_seconds() / 60
        session.save()
        return Response(StudySessionSerializer(session).data, status=status.HTTP_200_OK)
