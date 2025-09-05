import { useEffect, useState } from "react";
import ProductCard from "./components/ProductCard";

function App() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://fakestoreapi.com/products?limit=6");
        const data = await res.json();

        const formatted = data.map((item, idx) => ({
          id: item.id,
          name: item.title,
          price: `₹${(item.price * 80).toFixed(0)}`,
          images: [
            item.image,
            `/hover/hover${(idx % 6) + 1}.jpg`, //local hover image
          ],
        }));

        setProducts(formatted);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }

    fetchData();
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
