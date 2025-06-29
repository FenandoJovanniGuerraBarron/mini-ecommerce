import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import { CartProvider } from "./providers/CartProvider.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Header from "./components/Header.jsx";
import RedirectIfAuthenticated from "./components/RedirectIfAuthenticated.jsx";

/**
 * Componente principal de la aplicación
 * Configura el enrutamiento, proveedores de contexto y estructura general
 * Maneja las rutas principales: productos, login y registro
 */
function App() {
  return (
    <CartProvider>
      <Router>
        <Header />
        <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-16">
          <div className="w-full max-w-2xl">
            <Routes>
              {/* Ruta de registro - protegida por RedirectIfAuthenticated */}
              <Route
                path="/auth/register"
                element={
                  <RedirectIfAuthenticated>
                    <Register />
                  </RedirectIfAuthenticated>
                }
              />
              {/* Ruta principal - muestra productos */}
              <Route path="/" element={<Products />} />
              {/* Ruta de login - protegida por RedirectIfAuthenticated */}
              <Route
                path="/auth/login"
                element={
                  <RedirectIfAuthenticated>
                    <Login />
                  </RedirectIfAuthenticated>
                }
              />
            </Routes>
          </div>
          <CartSidebar />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
