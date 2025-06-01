import { Routes, Route } from "react-router-dom"
import Home from "./components/home"
import ReglaFalsa from "./components/methods/reglafalsa/reglaFalsa"
import Graficador from "./components/methods/graficador"
import Secante from "./components/methods/secante/secante"
import Newton from "./components/methods/newton/newton"
import Biseccion from "./components/methods/biseccion/biseccion"
import PuntoFijo from "./components/methods/puntofijo/puntofijo"
import Jacobi from "./components/methods/jacobi/jacobi"
import Gauss from "./components/methods/gauss/gauss"
import SOR from "./components/methods/sor/sor"
import Vander from "./components/methods/vander/vander"
/*import RaicesMultiples from "./components/methods/raicesmultiples/raicesmultiples"*/
import Lagrange from "./components/methods/lagrange/lagrange"
import NewtonInt from "./components/methods/newtonint/newtonint"

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodos/regla-falsa" element={<ReglaFalsa />} />
        <Route path="/graficador" element={<Graficador />} />
        <Route path="/metodos/secante" element={<Secante />} />
        <Route path="/metodos/newton" element={<Newton />} />
        <Route path="/metodos/punto-fijo" element={<PuntoFijo />} />
        <Route path="/metodos/biseccion" element={<Biseccion />} />
        <Route path="/metodos/raices-multiples" element={<Secante />} />
        <Route path="/metodos/jacobi" element={<Jacobi />} />
        <Route path="/metodos/sor" element={<SOR />} />
        <Route path="/metodos/gauss" element={<Gauss />} />
        <Route path="/metodos/vander" element={<Vander />} />
        <Route path="/metodos/lagrange" element={<Lagrange />} />
        <Route path="/metodos/newtonint" element={<NewtonInt />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  )
}

export default App