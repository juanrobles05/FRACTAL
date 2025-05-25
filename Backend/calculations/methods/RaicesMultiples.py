import math
from sympy import sympify, lambdify, Symbol

def multiple_roots_method(function_text, first_derivate_text, second_derivate_text, x0, tol, max_count):
    results = {
        'iterations': [],
        'conclusion': None
    }

    # Validaciones iniciales
    if max_count < 0:
        raise ValueError(f"Max iterations is < 0: iterations = {max_count}")
    if tol < 0:
        raise ValueError(f"tol is an incorrect value: tol = {tol}")

    # Preparar las funciones usando sympy
    x = Symbol('x')
    try:
        f_expr = sympify(function_text)
        f = lambdify(x, f_expr, 'math')
        f1_expr = sympify(first_derivate_text)
        f1 = lambdify(x, f1_expr, 'math')
        f2_expr = sympify(second_derivate_text)
        f2 = lambdify(x, f2_expr, 'math')
    except Exception:
        raise ValueError("Invalid function or derivative expression")

    # Verificar si x0 está en el dominio de la función y derivadas
    try:
        f_x = f(x0)
        f_xp = f1(x0)
        f_xs = f2(x0)
    except Exception:
        raise ValueError(f"x0 isn't defined in the domain of the function or its derivatives: x0 = {x0}")

    err = tol + 1
    d = f_xp**2 - f_x * f_xs
    cont = 0

    results['iterations'] = [[
        cont,
        f"{x0:.10e}",
        f"{f_x:.2e}",
        ""
    ]]

    while err > tol and d != 0 and cont < max_count:
        try:
            x_ev = x0 - (f_x * f_xp) / (f_xp**2 - f_x * f_xs)
        except ZeroDivisionError:
            raise ValueError(f"Division by zero in step {cont}")

        if math.isinf(x_ev):
            raise ValueError(f"Infinity value in step {cont}")

        try:
            f_x = f(x_ev)
            f_xp = f1(x_ev)
            f_xs = f2(x_ev)
        except Exception:
            raise ValueError(f"xi isn't defined in the domain of the function or its derivatives: xi = {x_ev}")

        err = abs(x_ev - x0)
        cont += 1
        x0 = x_ev
        d = f_xp**2 - f_x * f_xs

        results['iterations'].append([
            cont,
            f"{x0:.10e}",
            f"{f_x:.2e}",
            f"{err:.2e}"
        ])

    if abs(f_x) < 1e-15:
        results['conclusion'] = f"The root was found for x = {x0:.15f}"
    elif err <= tol:
        results['conclusion'] = f"An approximation of the root was found for x = {x0:.15f}"
    elif cont >= max_count:
        results['conclusion'] = "Given the number of iterations and the tolerance, it was impossible to find a satisfying root"
    else:
        results['conclusion'] = "The method exploded"

    return results