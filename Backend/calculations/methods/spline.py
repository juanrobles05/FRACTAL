import numpy as np

def spline_method(x, y, degree):
    n = len(x)
    if n != len(y):
        raise ValueError("Las listas x e y deben tener la misma longitud")
    if degree not in [1, 3]:
        raise ValueError("El grado permitido es 1 (lineal) o 3 (cúbico)")

    A = []
    b = []

    if degree == 1:  # Spline lineal
        for i in range(n - 1):
            A.append([x[i], 1] + [0] * (2 * (n - 1) - 2))
            A.append([x[i+1], 1] + [0] * (2 * (n - 1) - 2))
            b.extend([y[i], y[i+1]])
            if i < n - 2:
                A[-2][2*i+2:2*i+4] = [x[i+1], 1]
                A[-1][2*i+2:2*i+4] = [x[i+1], 1]
    elif degree == 3:  # Spline cúbico
        A = np.zeros(((n-1)*4, (n-1)*4))
        b = np.zeros((n-1)*4)
        idx = 0
        for i in range(n - 1):
            xi, xi1 = x[i], x[i+1]
            yi, yi1 = y[i], y[i+1]
            A[idx, i*4:i*4+4] = [xi**3, xi**2, xi, 1]
            b[idx] = yi
            idx += 1
            A[idx, i*4:i*4+4] = [xi1**3, xi1**2, xi1, 1]
            b[idx] = yi1
            idx += 1
        for i in range(1, n - 1):
            xi = x[i]
            A[idx, (i-1)*4:(i-1)*4+4] = [3*xi**2, 2*xi, 1, 0]
            A[idx, i*4:i*4+4] = [-3*xi**2, -2*xi, -1, 0]
            idx += 1
            A[idx, (i-1)*4:(i-1)*4+4] = [6*xi, 2, 0, 0]
            A[idx, i*4:i*4+4] = [-6*xi, -2, 0, 0]
            idx += 1
        A[idx, :4] = [6*x[0], 2, 0, 0]
        A[idx+1, -4:] = [6*x[-1], 2, 0, 0]

    coeffs = np.linalg.solve(np.array(A), np.array(b))
    coeffs = coeffs.reshape(-1, degree + 1).tolist()
    poly_text = []
    for i, c in enumerate(coeffs):
        terms = []
        if degree == 1:
            terms = [f"{c[0]:+.3f}x", f"{c[1]:+.3f}"]
        elif degree == 3:
            terms = [f"{c[0]:+.3f}x³", f"{c[1]:+.3f}x²", f"{c[2]:+.3f}x", f"{c[3]:+.3f}"]
        poly_text.append(" + ".join(terms))
    return {
        "polynomials": poly_text
    }
