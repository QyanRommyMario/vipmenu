import React from "react";
import "./App.css";
import "./main-nav.css";

import Menu from "./components/Menu/Menu";
import Cart from "./components/Cart/Cart";
import OrderHistory from "./components/Order/OrderHistory";
import { BrowserRouter as Router, Routes, Route, NavLink } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="app-container">
        <header>
          <h1>VIP Menu Order</h1>
          <p>Pilih menu favorit Anda</p>
          <nav className="main-nav">
            <NavLink to="/" end className={({isActive}) => isActive ? "active" : ""}>Menu</NavLink>
            <NavLink to="/cart" className={({isActive}) => isActive ? "active" : ""}>Keranjang</NavLink>
            <NavLink to="/orders" className={({isActive}) => isActive ? "active" : ""}>Riwayat Pesanan</NavLink>
          </nav>
        </header>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<OrderHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
