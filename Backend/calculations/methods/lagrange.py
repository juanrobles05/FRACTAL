import numpy as np
from numpy.polynomial import Polynomial

def lagrange_interpolation(x_points, y_points):
    n = len(x_points)
    if n > 7:
        raise ValueError("Se admiten hasta 7 puntos")

    x_points = np.array(x_points)
    y_points = np.array(y_points)
    coefs_matrix = np.zeros((n, n))

    for i in range(n):
        Li = np.poly1d([1.0])
        den = 1.0
        for j in range(n):
            if i != j:
                Li = np.polymul(Li, np.poly1d([1.0, -x_points[j]]))
                den *= (x_points[i] - x_points[j])
        Li = Li * (y_points[i] / den)
        coefs_matrix[i, -(Li.order + 1):] = Li.coeffs

    poly_coefs = np.sum(coefs_matrix, axis=0)
    poly = Polynomial(poly_coefs[::-1])  # Convertir a coeficientes crecientes

    # Construir polinomio en formato string
    terms = []
    degree = len(poly.coef) - 1
    for i, coef in enumerate(poly.coef):
        if abs(coef) < 1e-12:
            continue
        term = f"{coef:.4f}"
        if i == 1:
            term += " * x"
        elif i > 1:
            term += f" * x^{i}"
        terms.append(term)
    polynomial_str = " + ".join(terms)

    # Generar puntos de la curva para graficar
    x_plot = np.linspace(min(x_points)-1, max(x_points)+1, 300)
    y_plot = poly(x_plot)

    # Preparar salida
    results = {
        "polynomial": polynomial_str,
        "x_plot": x_plot.tolist(),
        "y_plot": y_plot.tolist(),
    }

    return results
