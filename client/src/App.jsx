import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import { CartProvider } from "./providers/CartProvider.jsx";
import CartSidebar from "./components/CartSidebar.jsx";
import Header from './components/Header.jsx';
import RedirectIfAuthenticated from './components/RedirectIfAuthenticated.jsx';

function App() {
  return (
    <CartProvider>
      <Header />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center pt-16">
        <Router>
          <div className="w-full max-w-2xl">
            <Routes>
              <Route path="/auth/register" element={
                <RedirectIfAuthenticated>
                  <Register />
                </RedirectIfAuthenticated>
              } />
              <Route path="*" element={
                <RedirectIfAuthenticated>
                  <Login />
                </RedirectIfAuthenticated>
              } />
              <Route path="/products" element={<Products />} />
              <Route path="/" element={<Register />} />
            </Routes>
          </div>
          <CartSidebar />
        </Router>
      </div>
    </CartProvider>
  );
}

export default App;
