import Card from './Card.jsx';
import Button from './Button.jsx';
import { useAuth } from '../hooks/useAuth.js';

/**
 * Componente ProductCard - Tarjeta de producto individual
 * Muestra información de un producto y permite agregarlo al carrito
 * Solo muestra el botón de agregar al carrito si el usuario está autenticado
 * @param {Object} product - Datos del producto a mostrar
 * @param {Function} onAddToCart - Función para agregar el producto al carrito
 */
function ProductCard({ product, onAddToCart }) {
  // Hook para verificar si el usuario está autenticado
  const { authenticated } = useAuth();

  return (
    <Card className="flex flex-col h-full justify-between">
      {/* Información del producto */}
      <div>
        {/* Nombre del producto */}
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        
        {/* Descripción del producto */}
        <p className="text-gray-600 mb-4">{product.description}</p>
        
        {/* Precio del producto */}
        <div className="text-xl font-semibold text-blue-700 mb-4">${product.price}</div>
      </div>
      
      {/* Botón de agregar al carrito - solo visible si está autenticado */}
      {authenticated && (
        <Button onClick={() => onAddToCart?.(product)}>
          Add to Cart
        </Button>
      )}
    </Card>
  );
}

export default ProductCard; 