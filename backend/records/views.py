from rest_framework import views, status, permissions
from rest_framework.response import Response
from rest_framework.exceptions import NotAuthenticated
from .models import StudySession
from .serializers import StudySessionSerializer
from django.utils import timezone
from django.shortcuts import get_object_or_404

class StartSessionView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            self.check_permissions(request)
        except NotAuthenticated:
            return Response({
                "error": "Non sei autenticato",
                "details": "Devi essere autenticato per iniziare una sessione di studio."
            }, status=status.HTTP_401_UNAUTHORIZED)

        session = StudySession.objects.create(
            user=request.user,
            session_date=timezone.now().date(),
            started_at=timezone.now()
        )
        return Response(StudySessionSerializer(session).data, status=status.HTTP_201_CREATED)

class StopSessionView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, session_id):
        try:
            self.check_permissions(request)
        except NotAuthenticated:
            return Response({
                "error": "Non sei autenticato",
                "details": "Devi essere autenticato per fermare una sessione di studio."
            }, status=status.HTTP_401_UNAUTHORIZED)

        session = StudySession.objects.get(id=session_id)
        session.ended_at = timezone.now()
        session.duration = (session.ended_at - session.started_at).total_seconds() / 60
        session.save()
        return Response(StudySessionSerializer(session).data, status=status.HTTP_200_OK)
    
class GetSessionView(views.APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, session_id):
        try:
            self.check_permissions(request)
        except NotAuthenticated:
            return Response({
                "error": "Non sei autenticato",
                "details": "Devi essere autenticato per visualizzare i dettagli della sessione di studio."
            }, status=status.HTTP_401_UNAUTHORIZED)

        session = get_object_or_404(StudySession, id=session_id, user=request.user)
        serializer = StudySessionSerializer(session)
        return Response(serializer.data, status=status.HTTP_200_OK)