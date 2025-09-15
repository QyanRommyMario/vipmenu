import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import "./CartItem.css";

const CartItem = ({ item }) => {
  const { updateQuantityToCart } = useContext(CartContext);

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateQuantityToCart(item.id, item.quantity - 1);
    } else {
      updateQuantityToCart(item.id, 0); // akan terhapus
    }
  };

  const handleIncrease = () => {
    updateQuantityToCart(item.id, item.quantity + 1);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-info">
        <strong>{item.name}</strong>
        <p>Rp{item.price.toLocaleString()}</p>
      </div>
      <div className="quantity-controls">
        <button onClick={handleDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={handleIncrease}>+</button>
      </div>
    </div>
  );
};

export default CartItem;
