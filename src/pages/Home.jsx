import React from "react";
import "../CSS/Home.css";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">ShopEase</div>

        <nav className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/Products">Products</Link>
          <Link to="/Deals">Deals</Link>
          <Link to="/Contact">Contact</Link>
        </nav>

        <div className="auth-buttons">
          <button className="login-btn"><Link to="/Login">Login</Link></button>
          <button className="register-btn"><Link to="/Register">Register</Link></button>
          
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-text">
          <h1>Shop Smarter, Live Better</h1>
          <p>Discover amazing products at unbeatable prices</p>
          <button className="primary-btn">Start Shopping</button>
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