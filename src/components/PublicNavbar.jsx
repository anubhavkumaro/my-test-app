import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../CSS/PublicNavbar.css";

export default function PublicNavbar({ cartCount }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="navbar">
      {/* Logo */}
      <div className="logo">
        ShopEase
      </div>

      {/* Hamburger Menu */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <nav className={menuOpen ? "nav-links active" : "nav-links"}>
        <Link to="/" onClick={() => setMenuOpen(false)}>
          Home
        </Link>

        <Link to="/Products" onClick={() => setMenuOpen(false)}>
          Products
        </Link>

        <Link to="/Deals" onClick={() => setMenuOpen(false)}>
          Deals
        </Link>

        <Link to="/Contact" onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        <div className="mobile-buttons">
          <button className="cart-btn1">
            🛒 Cart ({cartCount})
          </button>

          <button className="login-btn">
            <Link to="/Login">Login</Link>
          </button>

          <button className="register-btn">
            <Link to="/Register">Register</Link>
          </button>
        </div>
      </nav>

      {/* Desktop Right Side */}
      <div className="navbar-right desktop-buttons">
        <button className="cart-btn1">
          <Link to="/Cart" >🛒 Cart ({cartCount})</Link>
        </button>

        <button className="login-btn">
          <Link to="/Login">Login</Link>
        </button>

        <button className="register-btn">
          <Link to="/Register">Register</Link>
        </button>
      </div>
    </header>
  );
}