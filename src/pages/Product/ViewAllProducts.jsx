import React, { useEffect, useState } from "react";
import api from "../../api";
import "../../CSS/ViewAllProducts.css";

export default function ViewAllProducts() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [action, setAction] = useState("");
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [type, setType] = useState(""); // success | error

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    api
      .get("/viewAllProducts")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error:", err));
  };

  // ✅ DELETE
  const handleDelete = async () => {
    try {
      await api.delete(`/deleteProduct/${selectedProduct.id}`);
      setSelectedProduct(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();

      formData.append("id", selectedProduct.id); // ✅ consistent id
      formData.append("name", selectedProduct.name);
      formData.append("description", selectedProduct.description);
      formData.append("price", selectedProduct.price);
      formData.append("stock", selectedProduct.stock);
      formData.append("category", selectedProduct.category);

      // ✅ FIXED image
      if (selectedProduct.imageFile) {
        formData.append("image", selectedProduct.imageFile);
      }

      const res = await api.put(
        `/updateProduct/${selectedProduct.id}`,
        formData,
      );

      if (res.data === "success") {
        setMessage("Product updated successfully 🎉");
        setType("success");
        setSelectedProduct(null);
        fetchProducts();
        setPreview(null);
      }
    } catch (err) {
      setType("error");
      alert("❌ Failed to update product. Try again!");

      console.error(err);
    }

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  // 📸 Handle image preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedProduct({
        ...selectedProduct,
        imageFile: file, // store file
      });

      setPreview(URL.createObjectURL(file)); // preview
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 All Products</h2>
      {message && <div className={`message ${type}`}>{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {products.length > 0 ? (
            products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.description}</td>
                <td>₹ {p.price}</td>

                <td className="action-cell" height="100%">
                  <button
                    className="btn btn-view"
                    onClick={() => {
                      setSelectedProduct(p);
                      setAction("view");
                    }}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-edit"
                    onClick={() => {
                      setSelectedProduct(p);
                      setAction("edit");
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-delete"
                    onClick={() => {
                      setSelectedProduct(p);
                      setAction("delete");
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No Products Found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 🔥 MODAL */}
      {selectedProduct && (
        <div className="modal">
          <div className="modal-content">
            <h2>{action.toUpperCase()} PRODUCT</h2>

            {/* 👁 VIEW */}
            {action === "view" && (
              <>
                <p>
                  <b>ID:</b> {selectedProduct.id}
                </p>
                <p>
                  <b>Name:</b> {selectedProduct.name}
                </p>
                <p>
                  <b>Description:</b> {selectedProduct.description}
                </p>
                <p>
                  <b>Price:</b> ₹ {selectedProduct.price}
                </p>
                <p>
                  <b>Stock:</b> {selectedProduct.stock}
                </p>
                <p>
                  <b>Category:</b> {selectedProduct.category}
                </p>
                <p>
                  <b>Image:</b>
                  <img
                    src={`http://localhost:8080/uploads/images/${selectedProduct.imagePath}`}
                    alt={selectedProduct.name}
                    width="60px"
                  />
                </p>
              </>
            )}

            {/* ✏ EDIT */}
            {action === "edit" && (
              <>
                <input
                  value={selectedProduct.id}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      id: e.target.value,
                    })
                  }
                  placeholder="ID"
                  disabled
                />
                <input
                  value={selectedProduct.name}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      name: e.target.value,
                    })
                  }
                  placeholder="Name"
                />

                <input
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Description"
                />

                <input
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                  placeholder="Price"
                />
                <input
                  value={selectedProduct.stock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      stock: e.target.value,
                    })
                  }
                  placeholder="Stock"
                />
                <input
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                  placeholder="Category"
                />
                <input type="file" onChange={handleImageChange} />

                {/* 🖼 Preview */}
                <div>
                  {preview && (
                    <img
                      src={preview}
                      alt="Preview"
                      width="60px"
                      className="preview-img"
                    />
                  )}
                </div>
                <button className="btn btn-edit" onClick={handleUpdate}>
                  Update
                </button>
              </>
            )}

            {/* ❌ DELETE */}
            {action === "delete" && (
              <>
                <p>Are you sure you want to delete this product?</p>

                <button className="btn btn-delete" onClick={handleDelete}>
                  Delete
                </button>
              </>
            )}

            <button
              className="btn"
              onClick={() => {
                setSelectedProduct(null);
                setPreview(null); // ✅ reset preview also
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
