import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import ProductDetails from './pages/ProductDetails';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product already exists in cart
      const exists = prevItems.find(item => item._id === product._id);
      if (exists) {
        return prevItems.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      // Add new item with quantity 1
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(prevItems =>
      prevItems.map(item =>
        item._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar cartCount={cartItems.reduce((total, item) => total + (item.quantity || 1), 0)} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route 
            path="/product/:id" 
            element={<ProductDetails addToCart={addToCart} />} 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cartItems}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cartItems}
                clearCart={clearCart}
              />
            } 
          />
        </Routes>
      </main>

      <footer className="bg-gray-800 text-white py-4 mt-8">
        <div className="container mx-auto text-center">
          <p>© 2025 Clothes Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
