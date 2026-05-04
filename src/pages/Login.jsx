import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import "../CSS/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setError("");
    if(username === "") {
      setError("Fill The Username Fild");
      setLoading(false);
      setTimeout(()=>{
        setError("");
      },3000)
    }
    if(password === "") {
      setError("Fill The Password Fild");
      setLoading(false);
      setTimeout(()=>{
        setError("");
      },3000)
    }
    if(username != "" && password != "") {
    try {
      const res = await api.post("/api/auth/login", {
        username,
        password,
      });

      localStorage.setItem("token", res.data.toke);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("role", res.data.role);
      navigate("/admin/layout");
    } catch (err) {
      setError("Invalid username or password");
      setTimeout(()=>{
        setError("");
      },3000)
    } finally {
      setLoading(false);
    }
  }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>🔐 Admin Login</h2>

        <input
          type="text"
          placeholder="Username" required
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="error">{error}</p>}

        <button onClick={login} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;