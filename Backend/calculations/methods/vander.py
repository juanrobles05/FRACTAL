import numpy as np
import matplotlib.pyplot as plt
import io
import base64

def vandermonde_interpolation(x_points, y_points, order):
    n = len(x_points)
    if len(y_points) != n:
        raise ValueError("Los vectores x e y deben tener la misma longitud.")
    if order < 1 or order >= n:
        raise ValueError(f"El orden del polinomio debe ser entre 1 y {n-1}.")

    # Construcción de la matriz de Vandermonde
    A = np.vander(x_points, N=order+1, increasing=False)
    b = y_points
    a = np.linalg.solve(A, b)

    # Construcción del polinomio
    poly_terms = []
    for i, coef in enumerate(a):
        if abs(coef) < 1e-12:
            continue
        degree = order - i
        term = f"{coef:.5f}"
        if degree > 0:
            term += f"x^{degree}" if degree > 1 else "x"
        poly_terms.append(term)
    polynomial = " + ".join(poly_terms)

    # Evaluación del polinomio para graficar
    x_eval = np.linspace(min(x_points), max(x_points), 400)
    y_eval = sum(a[i] * x_eval ** (order - i) for i in range(order+1))

    # Generación del gráfico como imagen base64
    plt.figure(figsize=(8, 5))
    plt.plot(x_points, y_points, 'ro', label="Puntos")
    plt.plot(x_eval, y_eval, 'b-', label="Polinomio interpolante")
    plt.title("Interpolación por Vandermonde")
    plt.xlabel("x")
    plt.ylabel("y")
    plt.grid(True)
    plt.legend()

    buf = io.BytesIO()
    plt.savefig(buf, format='png')
    plt.close()
    buf.seek(0)
    image_base64 = base64.b64encode(buf.read()).decode('utf-8')

    return {
        "polynomial": polynomial,
        "image_base64": image_base64
    }
