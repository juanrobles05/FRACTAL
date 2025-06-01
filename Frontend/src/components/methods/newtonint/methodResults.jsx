import FractalHeader from "../../FractalHeader";

const MethodResultsNewton = ({ results }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h3 className="text-xl font-bold text-white text-center">Resultados de Newton Interpolante</h3>
      </div>

      <div className="p-3">
        {results.polynomial && (
          <div className="mb-6 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg border-l-4 border-teal-500">
            <p className="text-teal-800 dark:text-teal-200">
              Polinomio: {results.polynomial}
            </p>
          </div>
        )}

        {results.plot && (
          <div className="my-4">
            <img
              src={`data:image/png;base64,${results.plot}`}
              alt="Gráfica del polinomio"
              className="rounded-lg shadow border border-gray-300 dark:border-gray-700"
            />
          </div>
        )}

        {results.conclusion && (
          <div className="py-1 p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg mt-6 border-l-4 border-teal-500">
            <p className="text-teal-800 dark:text-teal-200">{results.conclusion}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MethodResultsNewton;
