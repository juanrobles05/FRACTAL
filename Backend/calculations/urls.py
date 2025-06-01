from django.urls import path
from .views import test_calculations, calculate_regla_falsa, calculate_secant, calculate_newton, calculate_vandermonde, calculate_lagrange

urlpatterns = [
    path('test/', test_calculations, name='test_calculations'),
    path('reglaFalsa/', calculate_regla_falsa, name='calculate_regla_falsa'),
    path('secante/', calculate_secant, name='calculate_secant'),
    path('newton/', calculate_newton, name='calculate_newton'),
    path('vander/', calculate_vandermonde, name='calculate_vandermonde'),
    path('lagrange/', calculate_lagrange, name='calculate_lagrange')
]