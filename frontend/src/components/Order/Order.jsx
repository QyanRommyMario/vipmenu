import React, { useContext, useState } from "react";
import { CartContext } from "../../context/CartContext";
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

const Order = () => {
  const { cartItems, clearCart, fetchCart } = useContext(CartContext);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleOrder = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (res.ok) {
        setShowModal(true);
        await fetchCart();
        setTimeout(() => {
          setShowModal(false);
          clearCart();
          navigate("/orders");
        }, 1200);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    clearCart();
    navigate("/orders");
  };

  return (
    <div className="order-container">
      <button
        className="order-button"
        onClick={handleOrder}
        disabled={cartItems.length === 0 || loading}
      >
        {loading ? "Memproses..." : "Pesan Sekarang"}
      </button>
      <Modal show={showModal} onClose={handleCloseModal}>
        <h3>Terima kasih!</h3>
        <p>Pesanan Anda telah berhasil dibuat.</p>
      </Modal>
    </div>
  );
};

export default Order;
