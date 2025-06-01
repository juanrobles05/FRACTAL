import { useState } from "react";
import { ArrowLeft, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import MethodFormNewton from "./methodForm";
import MethodResultsNewton from "../../methods/newtonint/methodResults";
import api from "../../../api/config";

const NewtonInt = () => {
  const [formData, setFormData] = useState({
    xPoints: "",
    yPoints: "",
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Preparar datos para la API
      const requestData = {
        x: formData.xPoints.split(",").map(Number),
        y: formData.yPoints.split(",").map(Number),
      };

      api.post("calculations/newtonint/", requestData)
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
            <div className="text-white font-medium">Newton Interpolante</div>
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
                Método de Newton Interpolante
              </h3>
              <p className="text-gray-300 mb-4">
                Este método utiliza las diferencias divididas para construir un polinomio interpolante que pasa por los puntos dados.
              </p>
              <div className="space-y-3 text-gray-400">
                <p><span className="font-medium text-teal-400">Funcionamiento:</span> Calcula el polinomio con las diferencias divididas y grafica la aproximación.</p>
                <p><span className="font-medium text-teal-400">Entradas:</span> Valores de x y y, en formato de lista separada por comas.</p>
                <p><span className="font-medium text-teal-400">Salida:</span> El polinomio interpolante escrito, su tabla de diferencias y la gráfica del ajuste.</p>
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
              <MethodFormNewton
                xPointsValue={formData.xPoints}
                yPointsValue={formData.yPoints}
                onXPointsChange={(e) => handleChange({ target: { name: "xPoints", value: e.target.value } })}
                onYPointsChange={(e) => handleChange({ target: { name: "yPoints", value: e.target.value } })}
                onSubmit={handleSubmit}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Results Section */}
            <div>
              {results ? (
                <MethodResultsNewton results={results} />
              ) : (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center h-full">
                  <div className="h-16 w-16 rounded-full bg-gray-700/50 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-teal-400">
                      <path d="M3 3v18h18" />
                      <path d="M3 15l4-4 4 4 4-4 4 4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Sin resultados aún</h3>
                  <p className="text-gray-400 text-center">Ingrese los datos y haga clic en "Calcular" para obtener el polinomio interpolante.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NewtonInt;
