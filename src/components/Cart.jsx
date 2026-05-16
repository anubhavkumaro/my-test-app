import React, { useState } from "react";
import "../CSS/Cart.css";
import PublicNavbar from "./PublicNavbar";

export default function Cart({ cartCount }) {
  // Dummy Cart Data
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Laptop",
      price: 55000,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
    },
    {
      id: 2,
      name: "Headphone",
      price: 2500,
      quantity: 2,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
  ]);

  // Increase Quantity
  const increaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQty = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Remove Item
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Total Price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <>
    <PublicNavbar cartCount={cartCount}/>
    <div className="cart-container">
      <h2>Shopping Cart 🛒</h2>

      {cartItems.length === 0 ? (
        <h3>Your Cart is Empty</h3>
      ) : (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} />

              <div className="cart-details">
                <h3>{item.name}</h3>
                <p>₹ {item.price}</p>

                <div className="quantity-box">
                  <button onClick={() => decreaseQty(item.id)}>
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button onClick={() => increaseQty(item.id)}>
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

            <button className="checkout-btn">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
    </>
  );
}