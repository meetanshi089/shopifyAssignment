import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    // Fetch 6 products
    fetch("https://fakestoreapi.com/products?limit=6")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          id: item.id,
          name: item.title,
          price: `₹${(item.price * 80).toFixed(0)}`,
          images: [
            item.image,
            `https://source.unsplash.com/400x400/?skincare,cosmetics&sig=${item.id}`,
          ],
        }));
        console.log(formatted);

        setProducts(formatted);
        formatted.forEach((item) => {
          const img = new Image();
          img.src = item.images[1];
        });
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const addToCart = (item) => {
    setToast(`${item.name} added to cart`);
    setTimeout(() => setToast(""), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8">
        Conscious Chemist Store
      </h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">Loading products...</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}

      {toast && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
          {toast}
        </div>
      )}
    </div>
  );
}

export default App;
