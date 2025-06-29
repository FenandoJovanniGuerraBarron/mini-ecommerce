import Card from './Card.jsx';
import Button from './Button.jsx';

function ProductCard({ product, onAddToCart }) {
  return (
    <Card className="flex flex-col h-full justify-between">
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="text-xl font-semibold text-blue-700 mb-4">${product.price}</div>
      </div>
      <Button onClick={() => onAddToCart?.(product)}>
        Add to Cart
      </Button>
    </Card>
  );
}

export default ProductCard; 