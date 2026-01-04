//  number of items inside cart
export function getTotalItems(cart) {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }
  
  // price of cart
  export function getTotalPrice(cart) {
    return cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  }
  
  // Update quantity 
  export function updateCartQuantity(cart, id, qty, stock) {
    if (qty < 1 || qty > stock) return cart;
  
    return cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
  }
  