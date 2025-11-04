import React from "react";
import { Link } from "react-router-dom";

function Cart({ cartItems }) {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty 😢</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>
          <h3>Total: ₹{total}</h3>
          <Link to="/checkout">
            <button>Go to Checkout</button>
          </Link>
        </>
      )}
    </div>
  );
}

export default Cart;
