import { useState, useCallback } from 'react';
import CartContext from '../context/cartContext.js';
import { getCart } from '../services/cart-service.js';

/**
 * Proveedor del contexto del carrito
 * Maneja el estado global del carrito y proporciona funciones para interactuar con él
 * @param {React.ReactNode} children - Componentes hijos que tendrán acceso al contexto
 */
export function CartProvider({ children }) {
  // Estado para controlar la visibilidad del sidebar del carrito
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado para almacenar los productos del carrito
  const [cart, setCart] = useState([]);
  
  // Estado para mostrar loading mientras se carga el carrito
  const [loading, setLoading] = useState(false);

  /**
   * Función para abrir el sidebar del carrito
   * Cambia el estado isOpen a true
   */
  const openCart = () => setIsOpen(true);
  
  /**
   * Función para cerrar el sidebar del carrito
   * Cambia el estado isOpen a false
   */
  const closeCart = () => setIsOpen(false);

  /**
   * Función para obtener los productos del carrito desde la API
   * Actualiza el estado del carrito con los datos del servidor
   * Maneja estados de carga y errores
   */
  const fetchCart = useCallback(async () => {
    setLoading(true);
    try {
      // Llama al servicio para obtener el carrito
      const data = await getCart();
      
      // Actualiza el estado con los items del carrito
      setCart(data.data.items);
    } catch {
      // En caso de error, limpia el carrito
      setCart([]);
    } finally {
      // Finaliza el estado de carga
      setLoading(false);
    }
  }, []);

  // Provee el estado y las funciones a toda la aplicación
  return (
    <CartContext.Provider value={{ isOpen, openCart, closeCart, cart, fetchCart, loading }}>
      {children}
    </CartContext.Provider>
  );
} 