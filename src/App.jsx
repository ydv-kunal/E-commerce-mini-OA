import { useState, useMemo } from "react";
import useProducts from "./hooks/useProducts";
import ProductList from "./components/ProductList";
import Filters from "./components/Filters";
import Cart from "./components/Cart";
import useDebounce from "./hooks/useDebounce";
import "./App.css";

export default function App() {
  const { products, loading } = useProducts();

  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 300);

  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("");
  const [cart, setCart] = useState([]);


  // filter + search + sort (together)
  const filteredProducts = useMemo(() => {
    let list = [...products];

    if (debouncedSearch) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
    }

    if (category !== "all") {
      list = list.filter(p => p.category === category);
    }

    if (sort === "low") {
      list.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      list.sort((a, b) => b.price - a.price);
    }

    return list;
  }, [products, debouncedSearch, category, sort]);

  return (
    <div className="container">
      <h1>Mini E-Commerce Product and Cart</h1>

      <Filters
        products={products}
        search={search}
        setSearch={setSearch}
        category={category}
        setCategory={setCategory}
        sort={sort}
        setSort={setSort}
      />

      <div className="layout">
        <ProductList
          products={filteredProducts}
          cart={cart}
          setCart={setCart}
        />
        <Cart cart={cart} setCart={setCart} />
      </div>

      {loading && <p>Loading...</p>}
    </div>
  );
}
