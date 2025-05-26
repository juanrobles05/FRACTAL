import { useState } from "react"
import { ArrowLeft, HelpCircle, Info } from "lucide-react"
import { Link } from "react-router-dom"
import MethodFormTemplate from "./methodForm"
import MethodResults from "./methodResults"
import api from "../../../api/config"

const puntofijo = () => {
  const [formData, setFormData] = useState({
    function: "sin(x-43*10^(-3))-x",
    gfunction: "(x)*(sin(x-43*10^(-3))-x)",
    x0: 1,
    tol: 0.0000001,
    max_count: 100,
  })

  const [results, setResults] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showInfo, setShowInfo] = useState(false)

  // Manejar cambios en los campos generales
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Manejar cambios en la función f(x)
  const handleFunctionChange = (e) => {
    const value = e.target.value
    setFormData((prev) => ({
      ...prev,
      function: value,
    }))
  }

  // Manejar cambios en g(x)
  const handleGChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      gfunction: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Validaciones básicas
      if (!formData.function) {
        throw new Error("Debe ingresar una función f(x)")
      }
      if (!formData.gfunction) {
        throw new Error("Debe ingresar una función g(x)")
      }

      // Preparar datos para la API
      const requestData = {
        function_text: formData.function,
        gfunction_text: formData.gfunction,
        x0: Number.parseFloat(formData.x0),
        tol: Number.parseFloat(formData.tol),
        max_count: Number.parseInt(formData.max_count),
      }

      api.post('calculations/puntofijo/', requestData)
        .then(response => {
          setResults(response.data)
          setIsLoading(false)
        })
        .catch(err => {
          setError(err.response?.data?.error || err.message || "Ocurrió un error al calcular")
          setResults(null)
          setIsLoading(false)
        })

    } catch (err) {
      setError(err.message || "Ocurrió un error al calcular")
      setResults(null)
      setIsLoading(false)
    }
  }

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <header className="bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="px-4 flex items-center text-teal-400 hover:text-teal-300 transition-colors mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Volver</span>
              </Link>
              <div className="flex items-center">
                <div className="relative h-10 w-10 mr-3">
                  <div className="absolute inset-0 bg-teal-800 rounded-lg transform rotate-45"></div>
                  <div className="absolute inset-1 bg-teal-500 rounded-md transform rotate-12"></div>
                  <div className="absolute inset-2 bg-teal-400 rounded-sm transform -rotate-12"></div>
                  <div className="absolute inset-3 bg-white dark:bg-gray-800 rounded-sm"></div>
                  <div className="absolute inset-4 bg-teal-600 rounded-sm transform -rotate-90"></div>
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  FRACTAL
                </span>
              </div>
            </div>
            <div className="text-white font-medium">Método de Punto Fijo</div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowInfo(!showInfo)}
                className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
              >
                <Info className="h-5 w-5 mr-1" />
                <span>Info</span>
              </button>

              <button
                onClick={() => {
                  // Aquí puedes agregar la lógica para el informe de resultados
                  console.log("Generar informe de resultados")
                }}
                className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
                disabled={!results}
              >
                <svg
                  className="h-5 w-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Informe de resultados</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Info Panel */}
      {showInfo && (
        <div className="bg-gray-800/80 border-b border-gray-700 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-teal-400" />
                Método de Punto Fijo
              </h3>
              <p className="text-gray-300 mb-4">
                El método de Punto Fijo es una técnica para encontrar raíces de ecuaciones que
                se basa en reescribir la ecuación en la forma x = g(x).
              </p>
              <div className="space-y-3 text-gray-400">
                <p>
                  <span className="font-medium text-teal-400">Funcionamiento:</span> Utiliza una función g(x) para generar una sucesión que converge a la raíz.
                </p>
                <p>
                  <span className="font-medium text-teal-400">Ventajas:</span> Es simple y puede converger rápidamente si se elige bien g(x).
                </p>
                <p>
                  <span className="font-medium text-teal-400">Requisitos:</span> La función debe ser continua y cumplir condiciones de convergencia en el intervalo.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <div>
              <MethodFormTemplate
                functionValue={formData.function}
                gValue={formData.gfunction}
                setGValue={(val) => setFormData((prev) => ({ ...prev, gfunction: val }))}
                x0Value={formData.x0}
                tolValue={formData.tol}
                maxCountValue={formData.max_count}
                onFunctionChange={handleFunctionChange}
                onAChange={(e) => handleChange({ target: { name: "x0", value: e.target.value } })}
                onTolChange={(e) => handleChange({ target: { name: "tol", value: e.target.value } })}
                onMaxCountChange={(e) => handleChange({ target: { name: "max_count", value: e.target.value } })}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
                methodName="Punto Fijo"
                submitText="Calcular"
              />
            </div>

            {/* Results Section */}
            <div>
              {results ? (
                <MethodResults results={results} methodName="Punto Fijo" functionText={formData.function} />
              ) : (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-teal-400"
                    >
                      <path d="M3 3v18h18" />
                      <path d="M3 15l4-4 4 4 4-4 4 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sin resultados aún</h3>
                  <p className="text-gray-400 text-center">
                    Complete los parámetros y haga clic en "Calcular" para ver los resultados del método.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default puntofijo