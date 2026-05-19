import React, { useState, useEffect } from "react";
import "../CSS/Cart.css";
import PublicNavbar from "./PublicNavbar";
import { BASE_URL } from "../api";

export default function Cart({ cartCount, setCartCount }) {
  // Dummy Cart Data
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token !== null) {
      fetchProducts();
    } else {
      const items = localStorage.getItem("cart");

      if (items) {
        setCartItems(JSON.parse(items));
      }
    }
  }, []);

  const fetchProducts = () => {
    api
      .get("/viewAllProducts")
      .then((res) => setCartItems(res.data))
      .catch((err) => console.error("Error:", err));
  };

  // Increase Quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item,
    );

    setCartItems(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Remove Item
 const removeItem = (id) => {

  const updatedCart = cartItems.filter(
    (item) => item.id !== id
  );

  setCartItems(updatedCart);

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  setCartCount(cart.length)
};

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      <PublicNavbar cartCount={cartCount} />
      <div className="cart-container">
        <h2>Shopping Cart 🛒</h2>

        {cartItems.length === 0 ? (
          <h3>Your Cart is Empty</h3>
        ) : (
          <>
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={`${BASE_URL}/uploads/images/${item.imagePath}`}
                  alt={item.name}
                />

                <div className="cart-details">
                  <h3>{item.name}</h3>
                  <p>₹ {item.price}</p>

                  <div className="quantity-box">
                    <button onClick={() => decreaseQty(item.id)}>-</button>

                    <span>{item.quantity}</span>

                    <button
                      className="qty-btn"
                      disabled={item.quantity >= item.stock}
                      onClick={() => increaseQty(item.id)}
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="remove-btn"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}

            <div className="cart-total">
              <h3>Total: ₹ {totalPrice}</h3>

              <button className="checkout-btn">Proceed to Checkout</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
