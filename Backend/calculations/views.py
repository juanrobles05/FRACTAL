from rest_framework.decorators import api_view
from rest_framework.response import Response
from .methods.ReglaFalsa import false_position_method
from .methods.Secante import secant_method
from .methods.Newton import newton_method
from .methods.vander import vandermonde_interpolation
from .methods.lagrange import lagrange_interpolation
from .methods.newtonint import newton_interpolante
from .methods.spline import spline_method

@api_view(['GET'])
def test_calculations(request):
    return Response({"message": "Calculations API is ready!"})

@api_view(['POST'])
def calculate_regla_falsa(request):

    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        function_text = data.get('function_text')
        a = float(data.get('a'))
        b = float(data.get('b'))
        tol = float(data.get('tol'))
        max_count = int(data.get('max_count'))

        # Validar que los datos sean correctos.
        if not function_text or a is None or b is None or tol is None or max_count is None:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función del método de Regla Falsa.
        results = false_position_method(function_text, a, b, tol, max_count)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)

@api_view(['POST'])
def calculate_secant(request):

    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        function_text = data.get('function_text')
        x0 = float(data.get('x0'))
        x1 = float(data.get('x1'))
        tol = float(data.get('tol'))
        max_count = int(data.get('max_count'))

        # Validar que los datos sean correctos.
        if not function_text or x0 is None or x1 is None or tol is None or max_count is None:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función del método de Secante.
        results = secant_method(function_text, x0, x1, tol, max_count)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)

@api_view(['POST'])
def calculate_newton(request):

    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        function_text = data.get('function_text')
        df_text = data.get('df_text')
        x0 = float(data.get('x0'))
        tol = float(data.get('tol'))
        max_iter = int(data.get('max_iter'))

        # Validar que los datos sean correctos.
        if not function_text or not df_text or x0 is None or tol is None or max_iter is None:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función del método de Newton.
        results = newton_method(function_text, df_text, x0, tol, max_iter)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)
    
def calculate_vandermonde(request):
    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        x_points = data.get('x_points')
        y_points = data.get('y_points')
        order = int(data.get('order'))

        # Validar que los datos sean correctos.
        if not x_points or not y_points or order is None:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función de interpolación de Vandermonde.
        results = vandermonde_interpolation(x_points, y_points, order)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)
    
def calculate_lagrange(request):
    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        x_points = data.get('x_points')
        y_points = data.get('y_points')

        # Validar que los datos sean correctos.
        if not x_points or not y_points:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función de interpolación de Lagrange.
        results = lagrange_interpolation(x_points, y_points)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)
    
def calculate_newton_interpolante(request):
    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        x_vals = data.get('x_vals')
        y_vals = data.get('y_vals')

        # Validar que los datos sean correctos.
        if not x_vals or not y_vals:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función de interpolación de Newton.
        results = newton_interpolante(x_vals, y_vals)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)
    
def calculate_spline(request):
    try:
        # Leer los datos enviados desde el frontend.
        data = request.data
        x_vals = data.get('x_vals')
        y_vals = data.get('y_vals')

        # Validar que los datos sean correctos.
        if not x_vals or not y_vals:
            return Response({"error": "Faltan parámetros"}, status=400)

        # Llamar a la función de interpolación por splines.
        results = spline_method(x_vals, y_vals)

        return Response(results, status=200)

    except ValueError as e:
        return Response({"error": str(e)}, status=400)
    except Exception as e:
        return Response({"error": "Error inesperado: " + str(e)}, status=500)
    
