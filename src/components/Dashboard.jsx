import React, { useEffect, useState } from "react";
import "../CSS/Dashboard.css"

export default function Dashboard() {
    const [username,setUsername] = useState("");

    useEffect(()=>{
        setUsername(localStorage.getItem("username"));
    })
  return (
    <div className="dashboard-content">

      {/* Top Header */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="admin-info">👤 {username}</div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Revenue</h3>
          <p>₹2,45,000</p>
        </div>

        <div className="stat-card">
          <h3>Total Orders</h3>
          <p>540</p>
        </div>

        <div className="stat-card">
          <h3>Total Users</h3>
          <p>1,200</p>
        </div>

        <div className="stat-card">
          <h3>Products</h3>
          <p>120</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="table-container">
        <h2>Recent Orders</h2>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#101</td>
              <td>Anubhav</td>
              <td>Shirt</td>
              <td>₹999</td>
              <td className="status success">Completed</td>
            </tr>

            <tr>
              <td>#102</td>
              <td>Rahul</td>
              <td>Shoes</td>
              <td>₹2499</td>
              <td className="status pending">Pending</td>
            </tr>

            <tr>
              <td>#103</td>
              <td>Priya</td>
              <td>Watch</td>
              <td>₹3999</td>
              <td className="status cancel">Cancelled</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}