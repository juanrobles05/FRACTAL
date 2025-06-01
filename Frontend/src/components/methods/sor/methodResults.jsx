import FractalHeader from "../../FractalHeader";

const methodResults = ({ results, methodName }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h3 className="text-xl font-bold text-white text-center">Resultados del Método {methodName}</h3>
      </div>

      <div className="p-3 ">
        <div className="py-1 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Radio espectral:</strong> {results.spectral_radius.toFixed(5)}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <strong>Convergencia:</strong> {results.can_converge ? "Puede converger" : "No converge"}
          </p>
        </div>

        {results.conclusion && (
          <div className="py-1 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg mb-6 border-l-4 border-teal-500">
            <p className="text-teal-800 dark:text-teal-200">{results.conclusion}</p>
          </div>
        )}

        <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700 shadow">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-teal-700 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Iteración</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">X</th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Error</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {results.iterations.map((row, index) => (
                <tr key={index} className={index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700/50"}>
                  <td className="px-2 py-3 text-sm font-medium text-gray-900 dark:text-white">{row[0]}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono">{row[1].join(", ")}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 dark:text-white font-mono">{row[2] ? row[2].toFixed(5) : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {results.solution && (
          <div className="mt-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border border-teal-200 dark:border-teal-800">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gradient-to-r from-teal-600 to-emerald-500 flex items-center justify-center text-white font-bold mr-3">
                x
              </div>
              <div>
                <p className="text-sm text-teal-800 dark:text-teal-200">Solución aproximada:</p>
                <p className="text-lg font-mono font-bold text-teal-800 dark:text-teal-200">{results.solution.join(", ")}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default methodResults;
