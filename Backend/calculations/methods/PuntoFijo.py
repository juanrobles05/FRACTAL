import math

def str_to_function(expr):
    """
    Convierte una expresión en string a una función lambda de una variable x.
    Se incluye el módulo math en el contexto.
    """
    return lambda x: eval(expr, {"x": x, "math": math})

def puntofijoDC(x0, tol, niter, fun, g):
    # Método de Punto Fijo con error absoluto
    x = x0
    f_val = fun(x)
    i = 0
    error = 100
    results = [(i, x, f_val, error)]
    
    while error > tol and f_val != 0 and i < niter:
        x_new = g(x)
        f_val = fun(x_new)
        error = abs(x_new - x)
        x = x_new
        i += 1
        results.append((i, x, f_val, error))
    
    # Mostrar resultados en formato tabla
    print("\n   i        Xn            F(Xn)         Error")
    for row in results:
        print("{:4d}  {:12.8f}  {:12.8f}  {:12.8f}".format(*row))
    
    if f_val == 0:
        print("\n{} es una raíz de f(x)".format(x))
    elif error <= tol:
        print("\n{} es una aproximación de una raíz con tolerancia {}".format(x, tol))
    else:
        print("\nFracaso en {} iteraciones".format(niter))

def puntofijoCS(x0, tol, niter, fun, g):
    # Método de Punto Fijo con error relativo
    x = x0
    f_val = fun(x)
    i = 0
    error = 100
    results = [(i, x, f_val, error)]
    
    while error >= tol and f_val != 0 and i < niter:
        x_new = g(x)
        f_val = fun(x_new)
        # Evitar división por cero
        if x_new != 0:
            error = abs((x_new - x) / x_new)
        else:
            error = float('inf')
        x = x_new
        i += 1
        results.append((i, x, f_val, error))
    
    # Mostrar resultados en formato tabla
    print("\n   i        Xn            F(Xn)         Error")
    for row in results:
        print("{:4d}  {:12.8f}  {:12.8f}  {:12.8f}".format(*row))
    
    if f_val == 0:
        print("\n{} es una raíz de f(x)".format(x))
    elif error < tol:
        print("\n{} es una aproximación de una raíz con tolerancia {}".format(x, tol))
    else:
        print("\nFracaso en {} iteraciones".format(niter))

def main():
    # Solicitar parámetros al usuario
    try:
        x0 = float(input("Ingrese el valor inicial x0: "))
        tol = float(input("Ingrese la tolerancia: "))
        niter = int(input("Ingrese el número máximo de iteraciones: "))
        
        expr_fun = input("Ingrese la función f(x): ")
        expr_g = input("Ingrese la función de iteración g(x): ")
        expr_df = input("Ingrese la función derivada f'(x): ")  # No es utilizada en este ejemplo
        intervalo = input("Ingrese el intervalo [a,b] (separado por coma): ")
        a, b = [float(val) for val in intervalo.split(",")]
    except Exception as e:
        print("Error en la entrada de datos:", e)
        return

    # Crear las funciones a partir de las expresiones ingresadas
    fun = str_to_function(expr_fun)
    g = str_to_function(expr_g)
    
    print("\nEjecutando puntofijoDC (error absoluto):")
    puntofijoDC(x0, tol, niter, fun, g)
    
    print("\nEjecutando puntofijoCS (error relativo):")
    puntofijoCS(x0, tol, niter, fun, g)

if __name__ == "__main__":
    main()