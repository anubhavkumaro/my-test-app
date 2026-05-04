import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./components/Unauthorized";
import Register from "./components/Register";

function App() {
  return (
    <Routes>
      {/* 🌐 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />
      <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} /> 
       <Route path="/unauthorized" element={<Unauthorized />} />

      /* ADMIN ROUTES */
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute allowedRoles={["ADMIN"]}>
            <Layout />
          </ProtectedRoute>
        }
      />
      /* USER ROUTES */
      {/* <Route
        path="/user/*"
        element={
          <ProtectedRoute allowedRoles={["USER"]}>
            <UserLayout />
          </ProtectedRoute>
        }
      /> */}
    </Routes>
  );
}

export default App;
