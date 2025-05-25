import math

def calculate_multiple_roots(funct, first_derivate, second_derivate, x0, tol=1e-7, max_count=100):
    results = {
        'iterations': [],
        'conclusion': None
    }

    # Verificar si x0 está en el dominio de la función
    try:
        f_x = funct(x0)
    except:
        raise ValueError(f"x0 isn't defined in the domain of the function f: x0 = {x0}")

    if max_count < 0:
        raise ValueError(f"Max iterations is < 0: iterations = {max_count}")
    if tol < 0:
        raise ValueError(f"tol is an incorrect value: tol = {tol}")

    f_xp = first_derivate(x0)
    f_xs = second_derivate(x0)
    err = tol + 1
    d = f_xp**2 - f_x * f_xs

    cont = 0

    results['iterations'] = [[
        cont,
        f"{x0:.10f}",
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
            f_x = funct(x_ev)
            f_xp = first_derivate(x_ev)
            f_xs = second_derivate(x_ev)
        except:
            raise ValueError(f"xi isn't defined in the domain of the function or its derivatives: xi = {x_ev}")

        err = abs(x_ev - x0)
        cont += 1
        x0 = x_ev

        results['iterations'].append([
            cont,
            f"{x0:.10e}",
            f"{f_x:.2e}",
            f"{err:.2e}"
        ])

    if abs(f_x) < tol:
        results['conclusion'] = f"The root was found for x = {x0:.15f}"
    elif err <= tol:
        results['conclusion'] = f"An approximation of the root was found for x = {x0:.15f}"
    elif cont >= max_count:
        results['conclusion'] = "Given the number of iterations and the tolerance, it was impossible to find a satisfying root"
    else:
        results['conclusion'] = "The method exploded"

    return results