import React from "react";
import { useNavigate } from "react-router-dom";
import "../CSS/Unauthorized.css";

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="unauth-container">
      <div className="unauth-card">

        <h1 className="code">403</h1>

        <h2>Access Denied</h2>

        <p>
          You don’t have permission to access this page.<br />
          Please login with the correct account or contact admin.
        </p>

        <div className="actions">
          <button onClick={() => navigate(-1)}>⬅ Go Back</button>
          <button onClick={() => navigate("/")}>🏠 Home</button>
          <button onClick={() => navigate("/login")} className="primary">
            🔐 Login
          </button>
        </div>

      </div>
    </div>
  );
}