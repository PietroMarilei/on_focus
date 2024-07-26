from django.urls import path
from .views import StartSessionView, StopSessionView, GetSessionView

urlpatterns = [
    path('start-session/', StartSessionView.as_view(), name='start-session'),
    path('stop-session/<int:session_id>/', StopSessionView.as_view(), name='stop-session'),
    path('get-session/<int:session_id>/', GetSessionView.as_view(), name='get-session'),
]
