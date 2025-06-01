import FractalHeader from "../../FractalHeader";

const methodForm = ({
  aValue,
  bValue,
  x0Value,
  tolValue,
  maxCountValue,
  wValue,
  onAChange,
  onBChange,
  onX0Change,
  onTolChange,
  onMaxCountChange,
  onWChange,
  onSubmit,
  isLoading = false,
  error = null,
  submitText = "Calcular",
  methodName = "Numérico",
}) => {
  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <div className="bg-gradient-to-r from-teal-600 to-emerald-500 px-6 py-4">
        <FractalHeader />
        <h2 className="text-xl font-bold text-white text-center">Método {methodName}</h2>
        <p className="text-teal-100 mt-1 text-sm text-center">Ingrese los parámetros necesarios</p>
      </div>

      <div className="p-4">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">Matriz A (filas separadas por ; y elementos por espacio)</label>
            <textarea
              rows="3"
              value={aValue}
              onChange={onAChange}
              className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="2 1;1 3"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">Vector b (elementos separados por espacio)</label>
            <input
              type="text"
              value={bValue}
              onChange={onBChange}
              className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="1 2"
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 dark:text-gray-300">Vector x0 (elementos separados por espacio)</label>
            <input
              type="text"
              value={x0Value}
              onChange={onX0Change}
              className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="0 0"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">Tolerancia</label>
              <input
                type="number"
                value={tolValue}
                onChange={onTolChange}
                className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                step="0.00001"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">Iteraciones máx.</label>
              <input
                type="number"
                value={maxCountValue}
                onChange={onMaxCountChange}
                className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
          </div>
          {wValue !== undefined && (
            <div>
              <label className="block text-sm text-gray-700 dark:text-gray-300">w (sólo SOR)</label>
              <input
                type="number"
                step="0.01"
                value={wValue}
                onChange={onWChange}
                className="w-full rounded-lg border p-2 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="1.25"
              />
            </div>
          )}
          {error && <div className="text-red-600">{error}</div>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gradient-to-r from-teal-600 to-emerald-500 text-white rounded-lg"
          >
            {isLoading ? "Calculando..." : submitText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default methodForm;
