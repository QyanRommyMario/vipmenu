import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./MenuItem.css";

const MenuItem = ({ item }) => {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    await addToCart(item);
    navigate("/cart");
  };

  return (
    <div className="menu-item">
      <img src={item.image} alt={item.name} className="menu-item-image" />
      <div className="item-details">
  <h3>{item.name}</h3>
  <p>{item.description}</p>
      </div>
      <button onClick={handleAddToCart}>Tambah</button>
    </div>
  );
};

export default MenuItem;
