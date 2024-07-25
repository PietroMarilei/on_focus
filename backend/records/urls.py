from django.urls import path
from .views import StartSessionView, StopSessionView

urlpatterns = [
    path('start-session/', StartSessionView.as_view(), name='start-session'),
    path('stop-session/<int:session_id>/', StopSessionView.as_view(), name='stop-session'),
]
