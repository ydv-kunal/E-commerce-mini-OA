import {
    getTotalItems,
    getTotalPrice,
    updateCartQuantity
  } from "../utils/helpers";
  
  export default function Cart({ cart, setCart }) {
  
    function handleQtyChange(id, qty, stock) {
      setCart(prev =>
        updateCartQuantity(prev, id, qty, stock)
      );
    }
  
    function removeItem(id) {
      setCart(prev => prev.filter(item => item.id !== id));
    }
  
    //Empty Cart;
    if (!cart.length) {
        return (
          <div className="empty-cart-box">
            🛒 Empty Cart
          </div>
        );
      }
  
    return (
      <div className="cart">

        <h3>🛍️ Cart</h3>

  
        {cart.map(item => (
          <div key={item.id}>
            <p>{item.title}</p>
  
            <input
              type="number"
              value={item.quantity}
              onChange={e =>
                handleQtyChange(
                  item.id,
                  Number(e.target.value),
                  item.stock
                )
              }
            />
  
            <button onClick={() => removeItem(item.id)}>
              Remove
            </button>
          </div>
        ))}
  
        <hr />
  
        <p>Total items: {getTotalItems(cart)}</p>
        <p>Total price: ₹{getTotalPrice(cart)}</p>
      </div>
    );
  }
  