import React, { useEffect, useState } from "react";
import "../CSS/Products.css";
import api, { BASE_URL } from "../api";
import PublicNavbar from "./PublicNavbar";

export default function Products({ cartCount, setCartCount }) {
  // Products State
  const [products, setProducts] = useState([]);

  // Loading State
  const [loading, setLoading] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");

  // Show More State
  const [expandedId, setExpandedId] = useState(null);

  // Load Products
  useEffect(() => {
    fetchProducts();

    // Load Cart From LocalStorage
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Calculate Total Quantity
    const totalQuantity = cart.reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  }, []);

  // Fetch Products
  const fetchProducts = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);

    api
      .get("/viewAllProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error:", err));
  };

  // Add To Cart
  const addToCart = (product) => {
    // Get Existing Cart
    const token = localStorage.getItem("token");
    if(token === null) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Find Existing Product
    const existingProduct = cart.find((item) => item.id === product.id);

    // Product Exists
    if (existingProduct) {
      existingProduct.quantity = (existingProduct.quantity || 0) + 1;

      setShowMessage(true);
      setMessage(`${existingProduct.quantity} Quantity Added ${product.name} 🛒`);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 5000);
    } else {
      // Add New Product
      cart.push({
        ...product,
        quantity: 1,
      });
      setCartCount(cart.length);
      setShowMessage(true);
      setMessage(`${product.name} Added To Cart 🛒`);
      setTimeout(() => {
        setShowMessage(false);
        setMessage("");
      }, 5000);
    }

    // Save Updated Cart
    localStorage.setItem("cart", JSON.stringify(cart));

    // Calculate Total Quantity
    const totalQuantity = cart.reduce(
      (total, item) => total + (item.quantity || 0),
      0,
    );
  }
  };

  return (
    <>
      {/* Navbar */}
      <PublicNavbar cartCount={cartCount} />

      <div className="products-page">
        {/* Loading */}
        {loading ? (
          <div className="loading-container">
            <div className="loader"></div>
            <h2>Loading Products...</h2>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div className="product-card" key={product.id}>
                {/* Product Image */}
                <img
                  src={`${BASE_URL}/uploads/images/${product.imagePath}`}
                  alt={product.fileName}
                  className="product-image"
                />

                {/* Product Info */}
                <div className="product-info">
                  {/* Category */}
                  <span className="category">{product.category}</span>

                  {/* Product Name */}
                  <h3>{product.name}</h3>

                  {/* Description */}
                  <p className="description">
                    {expandedId === product.id
                      ? product.description
                      : product.description?.slice(0, 30)}

                    {product.description?.length > 30 && (
                      <span
                        className="more-btn"
                        onClick={() =>
                          setExpandedId(
                            expandedId === product.id ? null : product.id,
                          )
                        }
                      >
                        {expandedId === product.id ? " Less" : " ...More"}
                      </span>
                    )}
                  </p>

                  {/* Price + Rating */}
                  <div className="price-rating">
                    <p className="price">₹{product.price}</p>

                    <span className="rating">⭐ 4.9</span>
                  </div>

                  {/* Stock */}
                  <p className="stock">
                    {product.stock > 0
                      ? `In Stock (${product.stock})`
                      : "Out Of Stock"}
                  </p>

                  {/* Buttons */}
                  <div className="product-buttons">
                    {/* Add To Cart */}
                    <button
                      className="add-cart-btn"
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                    >
                      Add To Cart
                    </button>

                    {/* Buy Now */}
                    <button
                      className="buy-now-btn"
                      disabled={product.stock === 0}
                    >
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showMessage && <p className="cart-message"><span>{message}</span>

    <button
      className="close-btn"
      onClick={() => setShowMessage(false)}
    >
      ×
    </button></p>}
    </>
  );
}
