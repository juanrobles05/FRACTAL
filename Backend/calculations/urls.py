from django.urls import path
from .views import test_calculations

urlpatterns = [
    path('test/', test_calculations, name='test_calculations'),
]