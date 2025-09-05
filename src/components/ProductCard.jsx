import { useState } from "react";

function ProductCard({ product, addToCart }) {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={hover ? product.images[1] : product.images[0]}
        alt={product.name}
        className="w-full h-64 object-cover"
        onError={(e) => {
          e.target.src = product.images[0];
        }}
      />

      <div className="p-4 flex flex-col gap-2">
        <h2 className="text-lg font-semibold">{product.name}</h2>
        <p className="text-gray-600">{product.price}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
