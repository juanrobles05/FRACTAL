import { Routes, Route } from "react-router-dom"
import Home from "./components/home"
import ReglaFalsa from "./components/methods/reglafalsa/reglaFalsa"
import Graficador from "./components/methods/graficador"
import Secante from "./components/methods/secante/secante"
import RaicesMultiples from "./components/methods/raicesmultiples/raicesmultiples"
import Biseccion from "./components/methods/biseccion/biseccion"
import Puntofijo from "./components/methods/puntofijo/puntofijo"
import Newton from "./components/methods/newton/newton"
import Informe from "./components/ComparativeReportGenerator"

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodos/regla-falsa" element={<ReglaFalsa />} />
        <Route path="/graficador" element={<Graficador />} />
        <Route path="/metodos/secante" element={<Secante />} />
        <Route path="/metodos/raices-multiples" element={<RaicesMultiples/>} />
        <Route path="/metodos/biseccion" element={<Biseccion />} />
        <Route path="/metodos/punto-fijo" element={<Puntofijo />} />
        <Route path="/metodos/newton" element={<Newton />} />
        <Route path="/informe" element={<Informe />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  )
}

export default App