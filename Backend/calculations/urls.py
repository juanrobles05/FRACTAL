from django.urls import path
from .views import test_calculations, calculate_regla_falsa, calculate_secant, calculate_multiple_roots, calculate_biseccion
from .views import calculate_fixed_point
urlpatterns = [
    path('test/', test_calculations, name='test_calculations'),
    path('reglaFalsa/', calculate_regla_falsa, name='calculate_regla_falsa'),
    path('secante/', calculate_secant, name='calculate_secant'),
    path('raicesMultiples/', calculate_multiple_roots, name='calculate_multiple_roots'),
    path('biseccion/', calculate_biseccion, name='calculate_biseccion'),
    path('puntoFijo/', calculate_fixed_point, name='calculate_fixed_point'),
]