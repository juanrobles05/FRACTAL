import { useState } from "react";
import { ArrowLeft, HelpCircle, Info } from "lucide-react";
import { Link } from "react-router-dom";
import MethodForm from "./methodForm";
import MethodResults from "../../methods/sor/methodResults";
import api from "../../../api/config";

const sor = () => {
  const [formData, setFormData] = useState({
    A: "",
    b: "",
    x0: "",
    tol: 0.00001,
    max_count: 100,
    w: 1.25
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const A = formData.A.split(";").map(row => row.trim().split(/\s+/).map(Number));
    const b = formData.b.trim().split(/\s+/).map(Number);
    const x0 = formData.x0.trim().split(/\s+/).map(Number);

    const requestData = {
      A: A,
      b: b,
      x0: x0,
      tol: parseFloat(formData.tol),
      max_iter: parseInt(formData.max_count),
      w: parseFloat(formData.w)
    };

    api.post('calculations/sor/', requestData)
      .then(response => {
        setResults(response.data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message || "Error en el cálculo");
        setResults(null);
        setIsLoading(false);
      });
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      <header className="bg-gray-900/80 border-b border-gray-800 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link to="/" className="px-4 flex items-center text-teal-400 hover:text-teal-300 mr-6">
                <ArrowLeft className="h-5 w-5 mr-2" />
                <span>Volver</span>
              </Link>
              <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">FRACTAL</span>
            </div>
            <div className="text-white font-medium">Método SOR</div>
            <button onClick={() => setShowInfo(!showInfo)} className="text-teal-400 hover:text-teal-300 flex items-center">
              <Info className="h-5 w-5 mr-1" /> <span>Info</span>
            </button>
          </div>
        </div>
      </header>

      {showInfo && (
        <div className="bg-gray-800/80 border-b border-gray-700 py-2">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <HelpCircle className="h-5 w-5 mr-2 text-teal-400" /> Método SOR
              </h3>
              <p className="text-gray-300">Método iterativo con parámetro de relajación w para sistemas Ax=b.</p>
            </div>
          </div>
        </div>
      )}

      <main className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          <MethodForm
            aValue={formData.A}
            bValue={formData.b}
            x0Value={formData.x0}
            tolValue={formData.tol}
            maxCountValue={formData.max_count}
            wValue={formData.w}
            onAChange={(e) => handleChange({ target: { name: "A", value: e.target.value } })}
            onBChange={(e) => handleChange({ target: { name: "b", value: e.target.value } })}
            onX0Change={(e) => handleChange({ target: { name: "x0", value: e.target.value } })}
            onTolChange={(e) => handleChange({ target: { name: "tol", value: e.target.value } })}
            onMaxCountChange={(e) => handleChange({ target: { name: "max_count", value: e.target.value } })}
            onWChange={(e) => handleChange({ target: { name: "w", value: e.target.value } })}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            methodName="SOR"
            submitText="Calcular"
          />
          <div>{results ? <MethodResults results={results} methodName="SOR" /> : <EmptyState />}</div>
        </div>
      </main>
    </div>
  );
};

const EmptyState = () => (
  <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-8 flex flex-col items-center justify-center h-full">
    <p className="text-white">Complete los datos y calcule.</p>
  </div>
);

export default sor;
