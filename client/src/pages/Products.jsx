import { useEffect, useState } from 'react';
import { productService } from '../services/product-service.js';
import { addToCart } from '../services/cart-service.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/useCart.js';

/**
 * Componente Products - Página principal de productos
 * Muestra la lista de productos disponibles y permite agregarlos al carrito
 * Maneja estados de carga, error y la funcionalidad de agregar al carrito
 */
function Products() {
  // Estados para manejar productos, carga y errores
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Hook del carrito para actualizar el estado global
  const { fetchCart } = useCart();

  /**
   * Efecto para cargar los productos al montar el componente
   * Llama al servicio de productos y actualiza el estado
   */
  useEffect(() => {
    productService.getAll()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => setError('Error loading products'))
      .finally(() => setLoading(false));
  }, []);

  /**
   * Efecto para actualizar el título de la página
   * Se ejecuta una vez al montar el componente
   */
  useEffect(() => {
    document.title = 'Productos | Mini Ecommerce';
  }, []);

  /**
   * Maneja la adición de un producto al carrito
   * Llama al servicio de carrito y actualiza el estado global
   * @param {Object} product - Producto a agregar al carrito
   */
  const handleAddToCart = async (product) => {
    try {
      // Agrega el producto al carrito con cantidad 1
      await addToCart(product.id, 1);
      
      // Actualiza el estado del carrito
      fetchCart();
    } catch {
      // Maneja errores al agregar al carrito
      setError('Error adding to cart');
    }
  };

  // Estados de carga y error
  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      {/* Grid responsivo de productos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart} 
          />
        ))}
      </div>
    </div>
  );
}

export default Products; 