import numpy as np
import matplotlib.pyplot as plt
import io
import base64

def newton_interpolante(x_vals, y_vals):
    n = len(x_vals)
    x = np.array(x_vals, dtype=float)
    y = np.array(y_vals, dtype=float)
    tabla = np.zeros((n, n+1))
    tabla[:, 0] = x
    tabla[:, 1] = y

    # Diferencias divididas
    for j in range(2, n+1):
        for i in range(j-1, n):
            tabla[i, j] = (tabla[i, j-1] - tabla[i-1, j-1]) / (x[i] - x[i-j+1])

    # Extraer coeficientes
    coeficientes = tabla[0:n, 1:n+1].diagonal()

    # Generar polinomio simbólico
    pol_str = f"{coeficientes[0]:.4f}"
    for i in range(1, n):
        terminos = "*".join([f"(x-{x[j]:.4f})" for j in range(i)])
        pol_str += f" + {coeficientes[i]:.4f}*{terminos}"

    # Generar gráfico
    x_plot = np.linspace(min(x)-1, max(x)+1, 400)
    y_plot = np.zeros_like(x_plot)
    for i in range(n):
        term = coeficientes[i]
        for j in range(i):
            term *= (x_plot - x[j])
        y_plot += term

    plt.figure(figsize=(8,5))
    plt.plot(x, y, 'ro', label="Datos")
    plt.plot(x_plot, y_plot, 'b-', label="Polinomio de Newton")
    plt.legend()
    plt.grid(True)
    plt.title("Interpolación de Newton")
    plt.xlabel("x")
    plt.ylabel("y")
    
    buffer = io.BytesIO()
    plt.savefig(buffer, format='png')
    plt.close()
    buffer.seek(0)
    plot_base64 = base64.b64encode(buffer.read()).decode()

    return {
        'tabla': tabla.tolist(),
        'polynomial': pol_str,
        'plot': plot_base64,
        'conclusion': f"Interpolación de Newton con {n} puntos completada."
    }
