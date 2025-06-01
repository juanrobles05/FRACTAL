import numpy as np

def sor_method(A, b, x0, tol, max_iter, w):
    n = len(A)
    if A.shape[0] != A.shape[1]:
        raise ValueError("La matriz A debe ser cuadrada")
    if n > 7:
        raise ValueError("La matriz A debe ser de máximo 7x7")
    if len(b) != n or len(x0) != n:
        raise ValueError("Dimensiones de b o x0 no coinciden con A")
    if not (0 < w < 2):
        raise ValueError("El parámetro de relajación w debe estar entre 0 y 2")

    x = x0.copy()
    errors = []
    iter_table = []

    D = np.diag(np.diag(A))
    L = -np.tril(A, -1)
    U = -np.triu(A, 1)

    T = np.linalg.inv(D - w * L) @ ((1 - w) * D + w * U)
    C = w * np.linalg.inv(D - w * L) @ b

    # Calcular radio espectral
    spectral_radius = max(abs(np.linalg.eigvals(T)))
    can_converge = spectral_radius < 1

    error = tol + 1
    count = 0
    iter_table.append([count, x.copy(), ""])
    while error > tol and count < max_iter:
        x_new = C + T @ x
        error = np.linalg.norm(x_new - x, ord=np.inf)
        errors.append(error)
        x = x_new
        count += 1
        iter_table.append([count, x.copy(), error])

    if error <= tol:
        conclusion = f"Se encontró una solución aproximada en {count} iteraciones con tolerancia {tol}."
    else:
        conclusion = f"No se alcanzó la convergencia en {max_iter} iteraciones."

    return {
        'iterations': iter_table,
        'spectral_radius': spectral_radius,
        'can_converge': can_converge,
        'conclusion': conclusion,
        'solution': x
    }
