import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import CartItem from "../CartItem/CartItem";
import Order from "../Order/Order";
import "./Cart.css";

const Cart = () => {
  const { cartItems } = useContext(CartContext);



  return (
    <div className="cart-container">
      <h2>Keranjang</h2>
      {cartItems.length === 0 ? (
        <p className="empty-cart">Keranjang masih kosong</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <hr />
          <Order />
        </>
      )}
    </div>
  );
};

export default Cart;
