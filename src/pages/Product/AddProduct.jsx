// src/pages/Product/AddProduct.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../CSS/AddProduct.css";
import api from "../../api";

export default function AddProduct() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const [file, setFile] = useState(null); // 🔥 file state
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [msgType, setMsgType] = useState(""); // success | error
  const [preview, setPreview] = useState(null);

  const navigate = useNavigate();

  // text input
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  // file input
  const handleFileChange = (e) => {
  const selectedFile = e.target.files[0];   // ✅ define file

  setFile(selectedFile);                   // ✅ set file once

  if (selectedFile) {
    const imageUrl = URL.createObjectURL(selectedFile);
    setPreview(imageUrl);                  // ✅ preview
  }
};

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);


    try {
      const formData = new FormData();

      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stock", product.stock);
      formData.append("category", product.category);
      formData.append("image", file);

      // 🔥 SEND TO BACKEND
      await api.post("/addProduct", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      

      // reset form
      setProduct({
        name: "",
        description: "",
        price: "",
        stock: "",
        category: "",
      });
      setFile(null);
      setMessage("Product Added Successfully ✅");
      setMsgType("success");
      document.getElementById("handleSubmit1").reset();
      setPreview(null);
      setTimeout(()=> {
        setMessage("");
        setMsgType("");
      },3000)
    } catch (err) {
      console.error(err);
        setMessage("Something went wrong ❌");
        setMsgType("error");
      setTimeout(() => setMessage(""), setMsgType(""), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2>➕ Add Product</h2>

        <form onSubmit={handleSubmit} id="handleSubmit1">
          <input
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            onChange={handleChange}
            required
          />

          <input
            name="price"
            type="number"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            name="stock"
            type="number"
            placeholder="Stock"
            onChange={handleChange}
            required
          />

          <input
            name="category"
            placeholder="Category"
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div>
              <p>Preview:</p>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  marginTop: "10px",
                }}
              />
            </div>
          )}

          {message && (
    <p className="message1" style={{
    color: msgType === "success" ? "#166534" : "#991b1b",
    backgroundColor:msgType === "success" ? "#dcfce7" : "#fee2e2",
    fontWeight: "bold"
    }}>
    {message}</p>
    )}

          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
}
