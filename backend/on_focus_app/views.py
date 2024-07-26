from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserRegistrationSerializer
# in on_focus_app/views.py
from django.views import View
from django.urls import get_resolver, URLPattern, URLResolver
from django.http import HttpResponse

class UserRegistrationView(APIView):
    def post(self, request):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            data = {
                'id': user.id,
                'username': user.username,
                'email': user.email
            }
            return Response(data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# debug rotte
class ShowUrlsView(View):
    def get(self, request):
        resolver = get_resolver()
        urls = self.get_urls(resolver)
        return HttpResponse("<br>".join(urls))

    def get_urls(self, resolver, prefix=''):
        urls = []
        for url_pattern in resolver.url_patterns:
            if isinstance(url_pattern, URLResolver):
                # This is an included URLconf
                new_prefix = prefix + str(url_pattern.pattern)
                urls.extend(self.get_urls(url_pattern, new_prefix))
            elif isinstance(url_pattern, URLPattern):
                # This is a URL pattern
                urls.append(prefix + str(url_pattern.pattern))
        return urls

