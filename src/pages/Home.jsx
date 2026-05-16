import React, { useState } from "react";
import "../CSS/Home.css";
import { Link } from "react-router-dom";
import PublicNavbar from "../components/PublicNavbar";

export default function Home({ cartCount }) {


  return (
    <div>
      <PublicNavbar cartCount={cartCount}/>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Shop Smarter, Live Better</h1>
          <p>Discover amazing products at unbeatable prices</p>

          {/* Add to Cart Button */}
          <button className="primary-btn">
            Add To Cart
          </button>
        </div>

        <img
          src="https://via.placeholder.com/400"
          alt="shopping"
          className="hero-img"
        />
      </section>

      {/* Features */}
      <section className="features">
        <div className="feature-card">
          <h3>🚚 Free Delivery</h3>
          <p>On all orders above ₹499</p>
        </div>

        <div className="feature-card">
          <h3>💳 Secure Payment</h3>
          <p>100% secure transactions</p>
        </div>

        <div className="feature-card">
          <h3>📦 Easy Returns</h3>
          <p>7-day return policy</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 ShopEase. All rights reserved.</p>
      </footer>
    </div>
  );
}