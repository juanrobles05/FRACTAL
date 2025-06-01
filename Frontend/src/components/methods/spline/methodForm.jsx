import FractalHeader from "../../FractalHeader";

const MethodFormSpline = ({ xPointsValue, yPointsValue, degreeValue, onXPointsChange, onYPointsChange, onDegreeChange, onSubmit, isLoading, error }) => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h2 className="text-xl font-bold text-white text-center">Método Spline</h2>
        <p className="text-teal-100 mt-1 text-sm text-center">Ingrese los datos y el tipo de spline</p>
      </div>

      <form onSubmit={onSubmit} className="p-4 space-y-4">
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">Valores de X (separados por comas)</label>
          <input type="text" value={xPointsValue} onChange={onXPointsChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">Valores de Y (separados por comas)</label>
          <input type="text" value={yPointsValue} onChange={onYPointsChange} className="input-field" required />
        </div>
        <div>
          <label className="block text-sm text-gray-700 dark:text-gray-300">Grado del Spline (1=Lineal, 3=Cúbico)</label>
          <input type="number" value={degreeValue} onChange={onDegreeChange} className="input-field" required min="1" max="3" />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" disabled={isLoading} className="btn-primary">
          {isLoading ? "Procesando..." : "Calcular"}
        </button>
      </form>
    </div>
  );
};

export default MethodFormSpline;
