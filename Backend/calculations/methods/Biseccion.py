from sympy import sympify, lambdify, Symbol

def bisection_method(function_text, xi, xs, tol, max_count):
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
        expr = sympify(function_text)
        f = lambdify(x, expr, 'math')
    except:
        raise ValueError("Invalid function expression")

    try:
        fi = f(xi)
        fs = f(xs)
    except:
        raise ValueError("xi or xs isn't defined in the function domain")

    if fi == 0:
        results['iterations'].append([0, "{:.10f}".format(xi), "{:.2e}".format(fi), ""])
        results['conclusion'] = f"{xi:.15f} is a root of f(x)"
        return results
    if fs == 0:
        results['iterations'].append([0, "{:.10f}".format(xs), "{:.2e}".format(fs), ""])
        results['conclusion'] = f"{xs:.15f} is a root of f(x)"
        return results
    if fi * fs > 0:
        raise ValueError("The interval is inadequate; function does not change sign")

    count = 0
    error = tol + 1
    xm = (xi + xs) / 2
    fm = f(xm)
    results['iterations'].append([count, "{:.10f}".format(xm), "{:.2e}".format(fm), ""])

    while error > tol and abs(fm) > 1e-14 and count < max_count:
        if fi * fm < 0:
            xs = xm
            fs = fm
        else:
            xi = xm
            fi = fm

        xa = xm
        xm = (xi + xs) / 2
        fm = f(xm)
        error = abs(xm - xa)
        count += 1
        results['iterations'].append([count, "{:.10f}".format(xm), "{:.2e}".format(fm), "{:.2e}".format(error)])

    if abs(fm) <= 1e-14:
        results['conclusion'] = f"{xm:.15f} is a root of f(x)"
    elif error <= tol:
        results['conclusion'] = f"An approximation of the root was found for x = {xm:.15f} with tolerance {tol}"
    elif count >= max_count:
        results['conclusion'] = f"Failed to converge after {max_count} iterations"
    else:
        results['conclusion'] = "The method exploded"

    return results
