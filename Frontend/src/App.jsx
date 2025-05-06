import { Routes, Route } from "react-router-dom"
import Home from "./components/home"
import ReglaFalsa from "./components/methods/ReglaFalsa"
import Graficador from "./components/methods/graficador"

function App() {
  return (
    <div className="w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/metodos/regla-falsa" element={<ReglaFalsa />} />
        <Route path="/graficador" element={<Graficador />} />
        {/* Otras rutas */}
      </Routes>
    </div>
  )
}

export default App