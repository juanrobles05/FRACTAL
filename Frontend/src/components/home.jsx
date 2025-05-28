import { Link } from 'react-router-dom'
import { useState } from 'react'

function home() {
  const [openCap1, setOpenCap1] = useState(false);
  const [openCap2, setOpenCap2] = useState(false);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-gray-900 to-gray-950">
      {/* Header */}
      <header className="pt-2 px-4 sm:px-6 lg:px-5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-3">
                <div className="absolute inset-0 bg-teal-800 rounded-lg transform rotate-45"></div>
                <div className="absolute inset-1 bg-teal-500 rounded-md transform rotate-12"></div>
                <div className="absolute inset-2 bg-teal-400 rounded-sm transform -rotate-12"></div>
                <div className="absolute inset-3 bg-white dark:bg-gray-800 rounded-sm"></div>
                <div className="absolute inset-4 bg-teal-600 rounded-sm transform -rotate-90"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                FRACTAL
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-3.5 px-4 sm:px-6 lg:px-8">
        <div className=" mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
            <span className="font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">FRACTAL</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10">
            Plataforma avanzada de métodos numéricos
          </p>
        </div>
      </section>

      {/* Methods Section */}
      <section id="metodos" className="py-4 px-4 sm:px-6 lg:px-8 bg-gray-900/50">
        <div className="mx-auto">
          <div className="text-center mb-16">
            <h2 className="py-4 text-3xl md:text-4xl font-bold text-white mb-4">Métodos Numéricos</h2>
          </div>

          <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
            {/* Capítulo 1 */}
            <div className="w-full md:w-1/2">
              <button
                onClick={() => setOpenCap1(!openCap1)}
                className="w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-teal-500/50 transition-all duration-300 px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-xl font-bold text-white">Capítulo 1: Métodos de una variable</span>
                <svg
                  className={`h-6 w-6 text-teal-400 transform transition-transform ${openCap1 ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {openCap1 && (
                <div className="mt-4 space-y-4">
                  <Link to="/metodos/biseccion" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Método de Bisección</Link>
                  <Link to="/metodos/regla-falsa" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Regla Falsa</Link>
                  <Link to="/metodos/punto-fijo" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Punto Fijo</Link>
                  <Link to="/metodos/newton" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Newton</Link>
                  <Link to="/metodos/secante" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Secante</Link>
                  <Link to="/metodos/raices-multiples" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Raíces Múltiples</Link>
                </div>
              )}
            </div>
            {/* Capítulo 2 */}
            <div className="w-full md:w-1/2">
              <button
                onClick={() => setOpenCap2(!openCap2)}
                className="w-full bg-gray-800 rounded-xl shadow-lg border border-gray-700 hover:border-teal-500/50 transition-all duration-300 px-6 py-4 flex items-center justify-between text-left"
              >
                <span className="text-xl font-bold text-white">Capítulo 2: Métodos de matrices</span>
                <svg
                  className={`h-6 w-6 text-teal-400 transform transition-transform ${openCap2 ? "rotate-90" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
              {openCap2 && (
                <div className="mt-4 space-y-4">
                  <Link to="/metodos/cap2/jacobi" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Jacobi</Link>
                  <Link to="/metodos/cap2/gauss-seidel" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">Gauss-Seidel</Link>
                  <Link to="/metodos/cap2/sor" className="block bg-gray-700 hover:bg-teal-700/40 rounded-lg px-4 py-3 text-white font-medium transition-all">SOR</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-7 px-4 sm:px-6 lg:px-8 bg-gray-900/80 border-t border-gray-800">
        <div className=" mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="relative h-10 w-10 mr-3">
                <div className="absolute inset-0 bg-teal-800 rounded-lg transform rotate-45"></div>
                <div className="absolute inset-1 bg-teal-500 rounded-md transform rotate-12"></div>
                <div className="absolute inset-2 bg-teal-400 rounded-sm transform -rotate-12"></div>
                <div className="absolute inset-3 bg-white dark:bg-gray-800 rounded-sm"></div>
                <div className="absolute inset-4 bg-teal-600 rounded-sm transform -rotate-90"></div>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent">
                FRACTAL
              </span>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} FRACTAL. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  )
}

export default home