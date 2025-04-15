import React, { useState, useEffect } from "react";
import api from "../api/config"; // Archivo de configuración para Axios

const TestCalculations = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    api.get("/calculations/test")
      .then((response) => setMessage(response.data.message))
      .catch((error) => console.error("Error fetching API:", error));
  }, []);

  return (
    <div>
      <h1>Test Calculations API</h1>
      <p>{message || "Loading..."}</p>
    </div>
  );
};

export default TestCalculations;