import { useEffect, useState } from 'react';
import { useCart } from '../context/useCart.js';
import { checkout, clearCart, removeFromCart, updateCartQuantity } from '../services/cart-service.js';
import Card from './Card.jsx';
import Button from './Button.jsx';
import CartItemCard from './CartItemCard.jsx';

function CartSidebar() {
  const { isOpen, closeCart, cart, fetchCart, loading } = useCart();
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Actualiza el carrito cada vez que se abre el sidebar
  useEffect(() => {
    if (isOpen) fetchCart();
  }, [isOpen, fetchCart]);

  // Realiza el checkout de los productos en el carrito
  const handleCheckout = async () => {
    setCheckoutLoading(true);
    setMessage('');
    try {
      await checkout();
      setMessage('¡Compra realizada con éxito!');
      setTimeout(() => setMessage(''), 2000);
      fetchCart(); // Actualiza el carrito (debería quedar vacío)
    } catch {
      setMessage('Error al realizar el checkout');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Vacía todo el carrito
  const handleClearCart = async () => {
    setCheckoutLoading(true);
    setMessage('');
    try {
      await clearCart();
      setTimeout(() => setMessage(''), 2000);
      fetchCart();
    } catch {
      setMessage('Error al vaciar el carrito');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Elimina un producto específico del carrito
  const handleRemove = async (productId) => {
    setCheckoutLoading(true);
    setMessage('');
    try {
      await removeFromCart(productId);
      setMessage('Producto eliminado');
      setTimeout(() => setMessage(''), 2000);
      fetchCart();
    } catch {
      setMessage('Error al eliminar el producto');
    } finally {
      setCheckoutLoading(false);
    }
  };

  // Disminuye la cantidad de un producto en el carrito
  const handleDecreaseQuantity = async (productId) => {
    setCheckoutLoading(true);
    setMessage('');
    try {
      await updateCartQuantity(productId);
      setMessage('Cantidad actualizada');
      setTimeout(() => setMessage(''), 1500);
      fetchCart();
    } catch {
      setMessage('Error al actualizar la cantidad');
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-60 bg-gray-100 shadow-2xl z-50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-xl font-bold">Carrito</h2>
        <button
          onClick={closeCart}
          className="text-gray-500 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
      </div>
      <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-64px)]">
        {loading && <div>Cargando...</div>}
        {message && (
          <div className="text-center font-semibold text-green-600">
            {message}
          </div>
        )}
        {!loading && cart.length === 0 && <div>El carrito está vacío.</div>}
        {!loading &&
          cart.map((item) => (
            <CartItemCard
              key={item.id}
              item={item}
              onRemove={handleRemove}
              onDecreaseQuantity={handleDecreaseQuantity}
            />
          ))}
        {!loading && cart.length > 0 && (
          <>
            <div className="text-right font-bold text-lg mt-4">
              Total: $
              {(
                Math.ceil(
                  cart.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) * 100
                ) / 100
              ).toFixed(2)}
            </div>
            <div className="flex gap-2 mt-4">
              <Button
                onClick={handleClearCart}
                isLoading={checkoutLoading}
                className="flex-1 bg-red-600 hover:bg-red-700"
              >
                Vaciar carrito
              </Button>
              <Button
                onClick={handleCheckout}
                isLoading={checkoutLoading}
                className="flex-1"
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CartSidebar; 