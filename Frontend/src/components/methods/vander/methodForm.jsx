import { useState } from "react"
import { Link } from "react-router-dom"
import FractalHeader from "../../FractalHeader"

const VandermondeForm = ({ onSubmit, isLoading, error }) => {
  const [xValues, setXValues] = useState("")
  const [yValues, setYValues] = useState("")
  const [order, setOrder] = useState(3)

  const handleSubmit = (e) => {
    e.preventDefault()
    const xArray = xValues.split(",").map(Number)
    const yArray = yValues.split(",").map(Number)
    onSubmit({ x_points: xArray, y_points: yArray, order: Number(order) })
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h2 className="text-xl font-bold text-white text-center">Interpolación de Vandermonde</h2>
        <p className="text-teal-100 mt-1 text-sm text-center">Ingrese los datos y el orden del polinomio</p>
      </div>

      <div className="p-3.5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valores de X (separados por coma)</label>
            <input type="text" value={xValues} onChange={(e) => setXValues(e.target.value)} required
              placeholder="-2,-1,2,3"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Valores de Y (separados por coma)</label>
            <input type="text" value={yValues} onChange={(e) => setYValues(e.target.value)} required
              placeholder="12.1,6.3,-4.6,2.1"
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Orden del polinomio</label>
            <input type="number" value={order} onChange={(e) => setOrder(e.target.value)} min={1} required
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white"
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500 text-red-700 dark:text-red-400">
              <p>{error}</p>
            </div>
          )}

          <button type="submit" disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-70">
            {isLoading ? "Calculando..." : "Calcular"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default VandermondeForm
