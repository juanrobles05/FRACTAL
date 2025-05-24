import { Routes, Route } from "react-router-dom"
import Home from "./components/home"
import ReglaFalsa from "./components/methods/reglafalsa/reglaFalsa"
import Graficador from "./components/methods/graficador"
import Secante from "./components/methods/secante/secante"

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodos/regla-falsa" element={<ReglaFalsa />} />
        <Route path="/graficador" element={<Graficador />} />
        <Route path="/metodos/secante" element={<Secante />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  )
}

export default App