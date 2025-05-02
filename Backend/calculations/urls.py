from django.urls import path
from .views import test_calculations, calculate_regla_falsa

urlpatterns = [
    path('test/', test_calculations, name='test_calculations'),
    path('reglaFalsa/', calculate_regla_falsa, name='calculate_regla_falsa')
]