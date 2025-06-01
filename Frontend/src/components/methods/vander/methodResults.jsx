import FractalHeader from "../../FractalHeader"

const VandermondeResults = ({ results }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h3 className="text-xl font-bold text-white text-center">Resultados de Interpolación Vandermonde</h3>
      </div>

      <div className="p-4 space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Polinomio Interpolante:</h4>
          <p className="text-lg font-mono text-gray-800 dark:text-gray-200 mt-1">{results.polynomial}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-500 dark:text-gray-400">Gráfica:</h4>
          <img src={`data:image/png;base64,${results.image_base64}`} alt="Gráfico Vandermonde" className="w-full rounded-md border border-gray-300 dark:border-gray-600" />
        </div>
      </div>
    </div>
  )
}

export default VandermondeResults
