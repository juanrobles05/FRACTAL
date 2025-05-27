import { useState } from "react";
import { ArrowLeft, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import MethodFormTemplate from "./methodForm";
import MethodResults from "../../methods/puntofijo/methodResults";
import api from "../../../api/config";

const puntoFijo = () => {
  const [formData, setFormData] = useState({
    function: "A*10^(-2)/8*cos(x - A*10^(-3)) - x",
    g_function: "A*10^(-2)/8*cos(x - A*10^(-3))",
    x0: 0,
    tol: 0.000005,
    max_count: 100,
    relative: false, // Flag para error relativo o absoluto
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const requestData = {
        function_text: formData.function,
        g_function_text: formData.g_function,
        x0: Number.parseFloat(formData.x0),
        tol: Number.parseFloat(formData.tol),
        max_count: Number.parseInt(formData.max_count),
        relative: formData.relative,
      };

      api.post("calculations/puntofijo/", requestData)
        .then(response => {
          setResults(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch(err => {
          setError(err.message || "Ocurrió un error al calcular");
          setResults(null);
          setIsLoading(false);
        });

    } catch (err) {
      setError(err.message || "Ocurrió un error al calcular");
      setResults(null);
      setIsLoading(false);
    }
  };

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
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="flex items-center text-teal-400 hover:text-teal-300 transition-colors"
            >
              <Info className="h-5 w-5 mr-1" />
              <span>Info</span>
            </button>
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
                El método de punto fijo utiliza una función g(x) para encontrar un punto donde g(x) = x, es decir, la raíz de f(x) = 0.
              </p>
              <div className="space-y-3 text-gray-400">
                <p>
                  <span className="font-medium text-teal-400">Funcionamiento:</span> Calcula nuevas aproximaciones usando g(x) en cada iteración.
                </p>
                <p>
                  <span className="font-medium text-teal-400">Error:</span> Se puede usar error absoluto o relativo según el problema.
                </p>
                <p>
                  <span className="font-medium text-teal-400">Requisitos:</span> La función g(x) debe ser contractiva para asegurar convergencia.
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
                gFunctionValue={formData.g_function}
                x0Value={formData.x0}
                tolValue={formData.tol}
                maxCountValue={formData.max_count}
                relativeValue={formData.relative}
                onFunctionChange={(e) => handleChange({ target: { name: "function", value: e.target.value } })}
                onGFunctionChange={(e) => handleChange({ target: { name: "g_function", value: e.target.value } })}
                onX0Change={(e) => handleChange({ target: { name: "x0", value: e.target.value } })}
                onTolChange={(e) => handleChange({ target: { name: "tol", value: e.target.value } })}
                onMaxCountChange={(e) => handleChange({ target: { name: "max_count", value: e.target.value } })}
                onRelativeChange={(e) => handleChange({ target: { name: "relative", checked: e.target.checked, type: 'checkbox' } })}
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
  );
};

export default puntoFijo;
