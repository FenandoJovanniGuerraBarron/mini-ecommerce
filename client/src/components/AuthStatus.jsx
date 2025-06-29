import { useAuth } from '../hooks/useAuth.js';

function AuthStatus() {
  const { authenticated, logout } = useAuth();
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-2">Estado de Autenticación</h3>
      {authenticated ? (
        <div className="space-y-2">
          <p className="text-green-600">✅ Usuario autenticado</p>
          {user && (
            <p className="text-gray-700">
              <strong>Usuario:</strong> {user.username}
            </p>
          )}
          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
          >
            Cerrar Sesión
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-red-600">❌ Usuario no autenticado</p>
          <p className="text-gray-600 text-sm">
            Necesitas iniciar sesión para acceder a esta funcionalidad
          </p>
        </div>
      )}
    </div>
  );
}

export default AuthStatus; 