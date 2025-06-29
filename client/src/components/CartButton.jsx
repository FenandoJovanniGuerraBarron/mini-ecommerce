import { useCart } from "../context/useCart.js";
import { cn } from "../utils/cn.js";

function CartButton() {
  const { openCart, isOpen } = useCart();
  return (
    <button
      onClick={openCart}
      className={cn(
        "fixed top-6 right-6 z-50 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors",
        isOpen && "hidden"
      )}
      aria-label="Abrir carrito"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437m0 0L6.6 9.015m-.394-3.743h13.262c.885 0 1.542.86 1.334 1.711l-1.347 5.385a1.25 1.25 0 01-1.212.954H7.013m9.884 0a3.001 3.001 0 11-5.784 0"
        />
      </svg>
    </button>
  );
}

export default CartButton;
