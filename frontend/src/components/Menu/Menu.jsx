import React, { useEffect, useState } from "react";
import MenuItem from "../MenuItem/MenuItem";
import "./Menu.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/menu`)
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="menu-container">
      <h2>Menu</h2>
      {loading ? (
        <p>Loading menu...</p>
      ) : menuItems.length === 0 ? (
        <p>Menu tidak tersedia</p>
      ) : (
        menuItems.map((item) => <MenuItem key={item.id} item={item} />)
      )}
    </div>
  );
};

export default Menu;
