import { useState, useCallback } from 'react';
import CartContext from '../context/cartContext.js';
import { getCart } from '../services/cart-service.js';

// Proveedor del contexto del carrito
export function CartProvider({ children }) {
  // Estado para controlar la visibilidad del sidebar
  const [isOpen, setIsOpen] = useState(false);
  // Estado para almacenar los productos del carrito
  const [cart, setCart] = useState([]);
  // Estado para mostrar loading mientras se carga el carrito
  const [loading, setLoading] = useState(false);

  // Función para abrir el sidebar del carrito
  const openCart = () => setIsOpen(true);
  // Función para cerrar el sidebar del carrito
  const closeCart = () => setIsOpen(false);

  // Función para obtener los productos del carrito desde la API
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getCart();
      setCart(data.data.items);
    } catch {
      setCart([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Provee el estado y las funciones a toda la app
  return (
    <CartContext.Provider value={{ isOpen, openCart, closeCart, cart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
} 