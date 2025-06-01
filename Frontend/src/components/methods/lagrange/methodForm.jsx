import FractalHeader from "../../FractalHeader"

const MethodFormLagrange = ({
  xPointsValue,
  yPointsValue,
  onXPointsChange,
  onYPointsChange,
  onSubmit,
  isLoading,
  error
}) => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h2 className="text-xl font-bold text-white text-center">Método de Lagrange</h2>
        <p className="text-teal-100 mt-1 text-sm text-center">Ingrese los puntos (x,y)</p>
      </div>
      <div className="p-3.5">
        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Valores de X (separados por comas)
            </label>
            <input
              type="text"
              value={xPointsValue}
              onChange={onXPointsChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="1, 2, 3"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Valores de Y (separados por comas)
            </label>
            <input
              type="text"
              value={yPointsValue}
              onChange={onYPointsChange}
              className="w-full px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              placeholder="4, 5, 6"
              required
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/30 rounded-lg border-l-4 border-red-500 text-red-700 dark:text-red-400">
              <p>{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white font-medium rounded-lg shadow-md"
          >
            {isLoading ? "Procesando..." : "Calcular"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MethodFormLagrange;
