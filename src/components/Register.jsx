import React, { useState } from "react";
import "../CSS/Register.css";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../api";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ for confirm field
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error
  const [loading, setLoading] = useState(false);

  const validate = () => {
    let newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.username.trim()) newErrors.username = "Username is required";

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Minimum 6 characters required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputUsername = (e) => {
    const { name, value } = e.target;

  // 🚫 Block spaces in username
  if (name === "username" && value.includes(" ")) {
    return;
  }

  setForm({ ...form, [name]: value });
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };



  const handleInput = (e)=>{
     
     if( e.target.name ==="confirmPassword" && e.target.value.length === 0) {
        setErrors({...errors,confirmPassword:""});
        return;
     }
     if(e.target.name === "confirmPassword" && form.password !== e.target.value) {
        setErrors({ ...errors, confirmPassword: "Password Not Match" });
     }
     else {
        setErrors({...errors,confirmPassword:""})
     }
  }

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  if (!validate()) 
  {
    setLoading(false);
    return;
  }

  try {

    const res = await api.post("/user/register", form);
    
    console.log(res.data);
    
    if(res.data === "User Alarady Register") {
        setMessage(res.data);
        setMsgType("error");
    }
    else {
        setMessage(res.data)
        setMsgType("success");
        // ✅ reset form
    setForm({
      name: "",
      username: "",
      password: "",
    });
    document.getElementsByName("confirmPassword")[0].value="";
    }

    setTimeout(()=> {
        setMessage("");
        setMsgType("");
        setLoading(false);
      },3000)

  } catch (err) {
    const mes = err.response?.data || "Registration failed";
    console.log(err);

  }
};

  return (
    <div className="register-container">
     
      <form className="register-card" onSubmit={handleSubmit}>
           {message && (
    <p className="message1" style={{
    color: msgType === "success" ? "#166534" : "#991b1b",
    backgroundColor:msgType === "success" ? "#dcfce7" : "#fee2e2",
    fontWeight: "bold"
    }}>
    {message}</p>
    )}
        <h2>Create Account</h2>

        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
          />
          {errors.name && <span>{errors.name}</span>}
        </div>

        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="Enter username"
            value={form.username}
            onInput={handleInputUsername}
          />
          {errors.username && <span>{errors.username}</span>}
        </div>

        {/* 🔐 Password Field */}
        <div className="input-group">
          <label>Password</label>
          <div className="password-box">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
            />

            <span
              className="eye-icon sp"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          {errors.password && <span>{errors.password}</span>}
        </div>

        {/* 🔐 Confirm Password */}
        <div className="input-group">
          <label>Confirm Password</label>
          <div className="password-box">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Re-enter password"
              onInput={handleInput}
            />

            <span
              className="eye-icon sp"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {errors.confirmPassword && (
            <span>{errors.confirmPassword}</span>
          )}
        </div>

        <button type="submit" disabled={loading} className="register-btn">
            {loading ? "Registering..." : "Register"}
          </button>

        <p className="login-text">
          Already have an account? <Link to="/Login">Login</Link>
        </p>
      </form>
    </div>
  );
}