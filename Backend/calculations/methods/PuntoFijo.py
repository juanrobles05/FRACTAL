from sympy import sympify, lambdify, Symbol

def fixed_point_method(function_text, g_function_text, x0, tol, max_count, relative=False):
    results = {
        'iterations': [],
        'conclusion': None
    }

    if max_count < 0:
        raise ValueError(f"Max iterations is < 0: iterations = {max_count}")
    if tol < 0:
        raise ValueError(f"tol is an incorrect value: tol = {tol}")

    x = Symbol('x')
    try:
        f_expr = sympify(function_text)
        g_expr = sympify(g_function_text)
        f = lambdify(x, f_expr, 'math')
        g = lambdify(x, g_expr, 'math')
    except:
        raise ValueError("Invalid function or iteration expression")

    try:
        fx = f(x0)
    except:
        raise ValueError("x0 isn't defined in the function domain")

    count = 0
    error = tol + 1

    results['iterations'].append([
        count,
        "{:.10f}".format(x0),
        "{:.2e}".format(fx),
        ""
    ])

    while ((error > tol) if not relative else (error >= tol)) and abs(fx) > 1e-14 and count < max_count:
        x1 = g(x0)
        fx = f(x1)
        error = abs(x1 - x0) if not relative else abs((x1 - x0) / x1)

        count += 1
        results['iterations'].append([
            count,
            "{:.10f}".format(x1),
            "{:.2e}".format(fx),
            "{:.2e}".format(error)
        ])

        x0 = x1

    if abs(fx) <= 1e-14:
        results['conclusion'] = f"{x0:.15f} is a root of f(x)"
    elif error <= tol:
        results['conclusion'] = f"An approximation of the root was found for x = {x0:.15f} with tolerance {tol}"
    elif count >= max_count:
        results['conclusion'] = f"Failed to converge after {max_count} iterations"
    else:
        results['conclusion'] = "The method exploded"

    return results

