import { useCart } from '../context/useCart.js';
import { logout } from '../services/auth-service.js';
import { useEffect, useState } from 'react';

function isAuthenticated() {
  return !!localStorage.getItem('token');
}

function Header() {
  const { openCart } = useCart();
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    // Escucha cambios en localStorage (otras pestañas)
    const onStorage = () => setAuthenticated(isAuthenticated());
    window.addEventListener('storage', onStorage);
    // Escucha cambios locales (login/logout)
    const onAuthChange = () => setAuthenticated(isAuthenticated());
    window.addEventListener('authChange', onAuthChange);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('authChange', onAuthChange);
    };
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-gray-800 text-white flex items-center justify-between px-6 py-3 shadow z-50">
      <div className="font-bold text-lg">Mini Ecommerce</div>
      {authenticated && (
        <div className="flex items-center gap-4">
          {user && <span className="text-sm text-gray-300">{user.username}</span>}
          <button
            onClick={openCart}
            className="relative bg-blue-600 hover:bg-blue-700 rounded-full p-2 transition-colors"
            aria-label="Abrir carrito"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.6 9.015m-.394-3.743h13.262c.885 0 1.542.86 1.334 1.711l-1.347 5.385a1.25 1.25 0 01-1.212.954H7.013m9.884 0a3.001 3.001 0 11-5.784 0" />
            </svg>
          </button>
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 rounded px-3 py-1 text-sm font-semibold transition-colors"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
}

export default Header; 