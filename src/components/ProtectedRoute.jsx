// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute({ children, allowedRoles }) {
//   const token = localStorage.getItem("token");
//   const role = localStorage.getItem("role")?.toUpperCase();

//   // 🔒 Not logged in
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // 🔒 Role check (only if roles provided)
//   if (allowedRoles && !allowedRoles.includes(role)) {
//     return <Navigate to="/unauthorized" replace />;
//   }

//   return children;
// }


import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BASE_URL } from "../api";

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")?.toUpperCase();

  const [isValid, setIsValid] = useState(null); // null = loading

  useEffect(() => {
    // 🚫 No token
    if (!token) {
      setIsValid(false);
      return;
    }

    const checkToken = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/auth/check-token`, {
          method: "GET",
          headers: {
            Authorization: "Bearer " + token,
          },
        });
          console.log(token);
        if (res.status === 200) {
          setIsValid(true);
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          localStorage.removeItem("username");

          setIsValid(false);
        }
      } catch (error) {
        console.error("Token check failed:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");

        setIsValid(false);
      }
    };

    checkToken();
  }, [token]);

  // ⏳ Loading state
  if (isValid === null) {
    return <div>Loading...</div>;
  }

  // 🔒 Invalid token
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // 🔒 Role check
  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Authorized
  return children;
}