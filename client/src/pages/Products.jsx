import { useEffect, useState } from 'react';
import { productService } from '../services/product-service.js';
import { addToCart } from '../services/cart-service.js';
import ProductCard from '../components/ProductCard.jsx';
import { useCart } from '../context/useCart.js';

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { fetchCart } = useCart();

  useEffect(() => {
    productService.getAll()
      .then((response) => {
        setProducts(response.data);
      })
      .catch(() => setError('Error loading products'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.title = 'Productos | Mini Ecommerce';
  }, []);

  const handleAddToCart = async (product) => {
    try {
      await addToCart(product.id, 1);
      fetchCart();
    } catch {
      setError('Error adding to cart');
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
        ))}
      </div>
    </div>
  );
}

export default Products; 