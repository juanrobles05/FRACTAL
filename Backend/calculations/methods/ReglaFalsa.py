from sympy import sympify, lambdify, Symbol

def false_position_method(function_text, a, b, tol, max_count):
    results = {
        'iterations': [],
        'conclusion': None
    }

    # Validaciones iniciales
    if max_count < 0:
        raise ValueError(f"Max iterations is < 0: iterations = {max_count}")
    if a >= b:
        raise ValueError(f"a has to be less than b: a = {a} ^ b = {b}")
    if tol < 0:
        raise ValueError(f"tol is an incorrect value: tol = {tol}")

    # Preparar la función
    x = Symbol('x')
    try:
        expr = sympify(function_text)
        f = lambdify(x, expr, 'math')
    except:
        raise ValueError("Invalid function expression")

    # Verificar que a y b estén en el dominio
    try:
        f(a)
        f(b)
    except:
        raise ValueError("a or b isn't defined in the function domain")

    count = 1
    try:
        x_r = b - (f(b) * (b - a)) / (f(b) - f(a))
        fx_r = f(x_r)
    except ZeroDivisionError:
        raise ValueError("Division by zero occurred - possibly same sign at endpoints")

    error = tol + 1
    temp = 0

    # Primera iteración
    results['iterations'].append([
        count,
        round(a, 10),
        round(x_r, 10),
        round(b, 10),
        "{:.2e}".format(fx_r),
        ""
    ])

    while error > tol and count < max_count:
        if f(a) * fx_r < 0:
            b = x_r
        elif f(b) * fx_r < 0:
            a = x_r
        else:
            break  # encontramos la raíz exacta


        count += 1
        temp = x_r

        try:
            x_r = b - (f(b) * (b - a)) / (f(b) - f(a))
            fx_r = f(x_r)
        except ZeroDivisionError:
            raise ValueError("Division by zero occurred - possibly same sign at endpoints")

        error = abs(x_r - temp)

        # Verificar dominio en cada iteración
        try:
            f(a)
            f(b)
        except:
            raise ValueError("Interval endpoint isn't defined in the function domain during iteration")

        results['iterations'].append([
            count,
            round(a, 10),
            round(x_r, 10),
            round(b, 10),
            "{:.2e}".format(fx_r),
            "{:.2e}".format(error)
        ])

    # Determinar conclusión
    if error <= tol:
        results['conclusion'] = f"An approximation of the root was found for m = {x_r:.15f}"
    elif count >= max_count:
        results['conclusion'] = ("Given the number of iterations and the tolerance, "
                               "it was impossible to find a satisfying root")
    else:
        results['conclusion'] = "The method exploded"

    return results