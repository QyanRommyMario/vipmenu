const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Dummy data
let menu = [
  { id: 1, name: "Salad Buah" },
  { id: 2, name: "Smoothie Alpukat" },
  { id: 3, name: "Ayam Panggang Lemon" },
  { id: 4, name: "Tumis Brokoli Wortel" },
  { id: 5, name: "Oatmeal Pisang" },
];
let cart = [];
let orders = [];

// Get menu
app.get("/menu", (req, res) => {
  res.json(menu);
});

// Get cart
app.get("/cart", (req, res) => {
  res.json(cart);
});

// Add to cart
app.post("/cart", (req, res) => {
  const { id, quantity } = req.body;
  const item = menu.find((m) => m.id === id);
  if (!item) return res.status(404).json({ error: "Menu not found" });
  const existing = cart.find((c) => c.id === id);
  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ ...item, quantity });
  }
  res.json(cart);
});


// Update quantity in cart
app.put("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { quantity } = req.body;
  const item = cart.find((c) => c.id === id);
  if (!item) return res.status(404).json({ error: "Item not in cart" });
  if (quantity <= 0) {
    cart = cart.filter((c) => c.id !== id);
  } else {
    item.quantity = quantity;
  }
  res.json(cart);
});

// Delete from cart
app.delete("/cart/:id", (req, res) => {
  const id = parseInt(req.params.id);
  cart = cart.filter((c) => c.id !== id);
  res.json(cart);
});

// Place order
app.post("/order", (req, res) => {
  if (cart.length === 0)
    return res.status(400).json({ error: "Cart is empty" });
  const order = {
    id: Date.now(),
    items: [...cart],
  };
  orders.push(order);
  cart = [];
  res.json(order);
});

// Get all orders
app.get("/orders", (req, res) => {
  res.json(orders);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
