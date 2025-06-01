import { useState } from "react";
import { ArrowLeft, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import MethodFormLagrange from "./methodForm";
import MethodResultsLagrange from "../../methods/lagrange/methodResults";
import api from "../../../api/config";

const Lagrange = () => {
  const [formData, setFormData] = useState({
    x_points: "",
    y_points: "",
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
      const x_points = formData.x_points.split(",").map(Number);
      const y_points = formData.y_points.split(",").map(Number);

      const requestData = {
        x_points: x_points,
        y_points: y_points,
      };

      api.post('calculations/lagrange/', requestData)
        .then(response => {
          setResults(response.data);
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
      <header className="bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <Link to="/" className="px-4 flex items-center text-teal-400 hover:text-teal-300 transition-colors mr-6">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Volver</span>
            </Link>
            <div className="text-white font-medium">Método de Lagrange</div>
            <button onClick={() => setShowInfo(!showInfo)} className="flex items-center text-teal-400 hover:text-teal-300 transition-colors">
              <Info className="h-5 w-5 mr-1" />
              <span>Info</span>
            </button>
          </div>
        </div>
      </header>

      {showInfo && (
        <div className="bg-gray-800/80 border-b border-gray-700 py-2">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-teal-400" />
                Método de Lagrange
              </h3>
              <p className="text-gray-300 mb-4">
                Calcula el polinomio interpolante a partir de un conjunto de puntos mediante el método de Lagrange.
              </p>
            </div>
          </div>
        </div>
      )}

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <MethodFormLagrange
              xPointsValue={formData.x_points}
              yPointsValue={formData.y_points}
              onXPointsChange={(e) => handleChange({ target: { name: "x_points", value: e.target.value } })}
              onYPointsChange={(e) => handleChange({ target: { name: "y_points", value: e.target.value } })}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              error={error}
            />
          </div>
          <div>
            {results ? (
              <MethodResultsLagrange results={results} />
            ) : (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center h-full">
                <h3 className="text-xl font-bold text-white mb-2">Sin resultados aún</h3>
                <p className="text-gray-400 text-center">Ingrese los puntos y calcule el polinomio de interpolación.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Lagrange;
