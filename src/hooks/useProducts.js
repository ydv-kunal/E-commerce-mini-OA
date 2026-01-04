import { useEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        // normalize data
        // forcing one product to be out of stock
        const normalized = data.products.map(p => ({
            id: p.id,
            title: p.title,
            price: p.price,
            category: p.category,
            stock: p.id === 4 ? 0 : p.stock, // product with id=4 is OUT OF STOCK
            thumbnail: p.thumbnail
          }));

        setProducts(normalized);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return { products, loading };
}
