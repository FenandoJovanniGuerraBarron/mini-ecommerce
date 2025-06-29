import Card from './Card.jsx';

function CartItemCard({ item, onRemove, onDecreaseQuantity }) {
  if (!item || typeof item !== 'object') return null;

  const { name, quantity, price, productId } = item;

  return (
    <Card className="flex flex-col gap-3 p-5 hover:shadow-md transition-shadow duration-200 relative">
      {/* Botón eliminar (X) en la esquina superior derecha */}
      <button
        onClick={() => onRemove(productId)}
        className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full border border-red-200 text-red-500 bg-white shadow hover:bg-red-500 hover:text-white active:scale-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-red-300 z-10"
        aria-label="Eliminar producto"
        title="Eliminar del carrito"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      {/* Nombre del producto */}
      <div className="font-semibold text-gray-900 text-base truncate mb-1 pr-8">
        {name}
      </div>
      {/* Subtítulo precios */}
      <div className="text-xs text-gray-500 font-medium uppercase tracking-wide mb-1">
        Precios
      </div>
      {/* Zona de precios en formato vertical */}
      <div className="flex flex-col gap-1 mb-2">
        <div className="flex gap-1 items-center">
          <span className="text-xs text-gray-500">Precio</span>
          <span className="font-semibold text-gray-800 text-base">${Number(price).toFixed(2)}</span>
        </div>
        <div className="flex gap-1 items-center">
          <span className="text-xs text-gray-500">Total</span>
          <span className="text-2xl font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-xl shadow-sm border border-blue-200 w-fit">${(Number(price) * quantity).toFixed(2)}</span>
        </div>
      </div>
      {/* Divisor */}
      <div className="border-t border-gray-200 my-2" />
      {/* Fila de cantidad centrada con botón '-' minimalista */}
      <div className="flex items-center justify-center gap-4 bg-gray-50 rounded-lg py-2 px-6 shadow-sm">
        <button
          onClick={() => onDecreaseQuantity(productId)}
          className={`w-7 h-7 flex items-center justify-center rounded-full text-lg font-bold text-gray-500 hover:bg-blue-100 hover:text-blue-600 active:scale-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-blue-300 border border-gray-300 ${quantity <= 1 ? "opacity-50 cursor-not-allowed" : ""}`}
          aria-label="Reducir cantidad"
          title="Reducir cantidad"
          disabled={quantity <= 1}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
          </svg>
        </button>
        <span className="text-base text-gray-500">Cantidad:</span>
        <span className="font-bold text-gray-800 text-lg px-2 select-none min-w-[2ch] text-center">
          {quantity}
        </span>
      </div>
    </Card>
  );
}

export default CartItemCard; 