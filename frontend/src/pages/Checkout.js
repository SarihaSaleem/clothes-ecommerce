import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ clearCart }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = (e) => {
    e.preventDefault();
    clearCart();
    setSuccess(true);
    setTimeout(() => navigate("/"), 2000);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Checkout</h2>
      {success ? (
        <h3>🎉 Order placed successfully!</h3>
      ) : (
        <form onSubmit={handleCheckout}>
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          /><br /><br />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          /><br /><br />
          <button type="submit">Place Order</button>
        </form>
      )}
    </div>
  );
}

export default Checkout;
