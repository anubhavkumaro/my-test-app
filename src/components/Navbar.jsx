import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSS/Navbar.css";

export default function Navbar() {
  const [userOpen, setUserOpen] = useState(false);
  const [productOpen, setProductOpen] = useState(false);

  const navigate = useNavigate();

  // 🔥 Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");   // remove auth token
    navigate("/");                      // redirect to login
  };

  return (
    <div className="sidebar">
      <h2 className="logo">Admin</h2>

      <ul className="menu">

        <li>
          <Link to="/admin/dashboard">🏠 Dashboard</Link>
        </li>

        {/* USER MANAGEMENT */}
        <li onClick={() => setUserOpen(!userOpen)}>
          👤 User Management ▾
        </li>

        {userOpen && (
          <ul className="submenu">
            <li><Link to="/admin/users">View All Users</Link></li>
            <li><Link to="/admin/user/search">Search User</Link></li>
            <li><Link to="/admin/user/add">Add User</Link></li>
            <li><Link to="/admin/user/update">Update User</Link></li>
            <li><Link to="/admin/user/delete">Delete User</Link></li>
          </ul>
        )}

        {/* PRODUCT MANAGEMENT */}
        <li onClick={() => setProductOpen(!productOpen)}>
          📦 Product Management ▾
        </li>

        {productOpen && (
          <ul className="submenu">
            <li><Link to="/admin/products">View All Products</Link></li>
            <li><Link to="/admin/product/search">Search Product</Link></li>
            <li><Link to="/admin/product/add">Add Product</Link></li>
            <li><Link to="/admin/product/update">Update Product</Link></li>
            <li><Link to="/admin/product/delete">Delete Product</Link></li>
          </ul>
        )}

        {/* 🚪 LOGOUT */}
        <li className="logout" onClick={handleLogout}>
          🚪 Logout
        </li>

      </ul>
    </div>
  );
}