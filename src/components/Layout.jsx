import { Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";

// /* USER PAGES */
// import ViewAllUsers from "../pages/User/ViewAllUsers";
// import ViewUser from "../pages/User/ViewUser";
// import SearchUser from "../pages/User/SearchUser";
// import UpdateUser from "../pages/User/UpdateUser";
// import DeleteUser from "../pages/User/DeleteUser";

// /* PRODUCT PAGES */
import ViewAllProducts from "../pages/Product/ViewAllProducts";
// import SearchProduct from "../pages/Product/SearchProduct";
import AddProduct from "../pages/Product/AddProduct";
// import UpdateProduct from "../pages/Product/UpdateProduct";
// import DeleteProduct from "../pages/Product/DeleteProduct";

import "../CSS/Layout.css";
import Dashboard from "./Dashboard";


export default function Layout() {
  return (
    <div className="layout">
      <Navbar />

      <div className="content">
        <Routes>

          {/* 🏠 Dashboard */}
          <Route path="/dashboard" element={<Dashboard/>} />

          {/* 👤 USER ROUTES
          <Route path="/users" element={<ViewAllUsers />} />
          <Route path="/user/search" element={<SearchUser />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/update" element={<UpdateUser />} />
          <Route path="/user/delete" element={<DeleteUser />} /> */}

          {/* 📦 PRODUCT ROUTES */}
          <Route path="/products" element={<ViewAllProducts />} />
           {/* <Route path="/product/search" element={<SearchProduct />} /> */}
          <Route path="/product/add" element={<AddProduct />} />
          {/*<Route path="/product/update" element={<UpdateProduct />} />
          <Route path="/product/delete" element={<DeleteProduct />} /> */}

          {/* ❌ 404 */}
          <Route path="*" element={<h2>Page Not Found</h2>} />

        </Routes>
      </div>
    </div>
  );
}