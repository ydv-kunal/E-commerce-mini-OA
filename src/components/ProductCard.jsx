export default function ProductCard({ product, cart, setCart }) {
    const inCart = cart.find(item => item.id === product.id);
  
    function addToCart() {
      setCart(prev => [
        ...prev,
        { ...product, quantity: 1 }
      ]);
    }
  
    return (
      <div className="card">
        <img src={product.thumbnail} alt={product.title} />
        <h4>{product.title}</h4>
        <p>₹{product.price}</p>
        <p>{product.category}</p>
        <p>
          {product.stock > 0 ? "In stock" : "Out of stock"}
        </p>
        <p style={{ color: product.stock > 0 ? "green" : "red" }}>
            {product.stock > 0 ? "In stock" : "Out of stock"}
        </p>

        
  
        <button
          disabled={product.stock === 0 || inCart}
          onClick={addToCart}
        >
          Add to Cart
        </button>
      </div>
    );
  }
  