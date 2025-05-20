from django.urls import path
from .views import test_calculations, calculate_regla_falsa, calculate_secant

urlpatterns = [
    path('test/', test_calculations, name='test_calculations'),
    path('reglaFalsa/', calculate_regla_falsa, name='calculate_regla_falsa'),
    path('secante/', calculate_secant, name='calculate_secant')
]