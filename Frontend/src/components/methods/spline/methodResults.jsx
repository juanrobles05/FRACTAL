import FractalHeader from "../../FractalHeader";

const MethodResultsSpline = ({ results }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h3 className="text-xl font-bold text-white text-center">Resultados del Método Spline</h3>
      </div>

      <div className="p-4 space-y-4">
        {results.polynomials.map((poly, idx) => (
          <div key={idx} className="bg-teal-100 dark:bg-teal-900/30 p-2 rounded-md border-l-4 border-teal-500">
            <p className="font-mono text-teal-800 dark:text-teal-200">{`Intervalo ${idx + 1}: ${poly}`}</p>
          </div>
        ))}
        <p className="text-sm text-gray-600 dark:text-gray-400">Gráfica y polinomios se pueden visualizar en el reporte completo.</p>
      </div>
    </div>
  );
};

export default MethodResultsSpline;
