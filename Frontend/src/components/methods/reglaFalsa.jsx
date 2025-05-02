"use client"
import React, { useState } from 'react';
import MethodFormTemplate from '../methodFormTemplate';
import api from '../../api/config';
import MethodResults from '../methodResults'; // Nuevo componente para resultados

const reglaFalsa = () => {
  const [formData, setFormData] = useState({
    function: 'x^3 - 2*x - 5',
    a: 2,
    b: 3,
    tol: 0.0000001,
    max_count: 100
  });

  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      // Validaciones básicas
      if (parseFloat(formData.a) >= parseFloat(formData.b)) {
        throw new Error("El extremo 'a' debe ser menor que 'b'");
      }

      // Preparar datos para la API
      const requestData = {
        function_text: formData.function,
        a: parseFloat(formData.a),
        b: parseFloat(formData.b),
        tol: parseFloat(formData.tol),
        max_count: parseInt(formData.max_count)
      };

      // Llamada a la API
      const response = await api.post('calculations/reglaFalsa/', requestData)

      const data = await response.data
      console.log(data);
      setResults(data);

    } catch (err) {
      setError(err.message || "Ocurrió un error al calcular");
      setResults(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Formulario */}
        <div>
          <MethodFormTemplate
            functionValue={formData.function}
            aValue={formData.a}
            bValue={formData.b}
            tolValue={formData.tol}
            maxCountValue={formData.max_count}
            onFunctionChange={handleChange}
            onAChange={handleChange}
            onBChange={handleChange}
            onTolChange={handleChange}
            onMaxCountChange={handleChange}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
            submitText="Calcular con Regla Falsa"
          />
        </div>

        <div>
          {results && (
            <MethodResults
              results={results}
              methodName="Regla Falsa"
              functionText={formData.function}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default reglaFalsa;