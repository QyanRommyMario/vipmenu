import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend
  const fetchCart = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/cart`);
      const data = await res.json();
      setCartItems(data);
    } catch (err) {
      setCartItems([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const addToCart = async (item) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, quantity: 1 }),
      });
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/cart/${itemId}`, { method: "DELETE" });
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  const updateQuantityToCart = async (itemId, quantity) => {
    setLoading(true);
    try {
      await fetch(`${API_URL}/cart/${itemId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity }),
      });
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    // Remove all items one by one
    setLoading(true);
    try {
      for (const item of cartItems) {
        await fetch(`${API_URL}/cart/${item.id}`, { method: "DELETE" });
      }
      await fetchCart();
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantityToCart,
        clearCart,
        loading,
        fetchCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
