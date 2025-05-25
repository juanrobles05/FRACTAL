from sympy import sympify, lambdify, Symbol

def bisection_method(function_text, a, b, tol, max_count):
    results = {
        'iterations': [],
        'conclusion': None
    }

    # Validaciones iniciales
    if max_count < 0:
        raise ValueError(f"Max iterations is < 0: iterations = {max_count}")
    if tol < 0:
        raise ValueError(f"tol is an incorrect value: tol = {tol}")

    # Preparar la función
    x = Symbol('x')
    try:
        expr = sympify(function_text)
        f = lambdify(x, expr, 'math')
    except:
        raise ValueError("Invalid function expression")

    # Verificar puntos iniciales
    try:
        fi = f(a)
        fs = f(b)
    except:
        raise ValueError("a or b isn't defined in the function domain")

    # Casos especiales (raíces en los extremos)
    if fi == 0:
        results['iterations'].append([0, a, a, b, 0, 0])
        results['conclusion'] = f"{a:.15f} is a root of f(x)"
        return results
    if fs == 0:
        results['iterations'].append([0, a, b, b, 0, 0])
        results['conclusion'] = f"{b:.15f} is a root of f(x)"
        return results
    if fi * fs > 0:
        raise ValueError("The interval is inadequate; function does not change sign")

    count = 0
    error = tol + 1
    xm = (a + b) / 2
    fm = f(xm)

    # Primera iteración
    results['iterations'].append([
        count,
        float(a),
        float(xm),
        float(b),
        float(fm),
        ""
    ])

    while error > tol and abs(fm) > 1e-14 and count < max_count:
        if fi * fm < 0:
            b = xm
            fs = fm
        else:
            a = xm
            fi = fm

        xa = xm
        xm = (a + b) / 2
        fm = f(xm)
        error = abs(xm - xa)
        count += 1

        # Agregar datos de la iteración
        results['iterations'].append([
            count,
            float(a),
            float(xm),
            float(b),
            float(fm),
            float(error)
        ])

    # Determinar conclusión
    if abs(fm) <= 1e-15:
        results['conclusion'] = f"{xm:.15f} is a root of f(x)"
    elif error <= tol:
        results['conclusion'] = f"An approximation of the root was found for x = {xm:.15f}"
    elif count >= max_count:
        results['conclusion'] = f"Failed to converge after {max_count} iterations"
    else:
        results['conclusion'] = "The method exploded"

    return results