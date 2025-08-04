import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  // Check if token exists and is not an empty string
  if (!token || token.trim() === "") {
    return <Navigate to="/login" replace />;
  }

  // Token exists and is valid; allow access to protected route
  return children;
}



/**import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}  **/


/** 

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react/jsx-runtime";

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuth();

  // If no token, user is not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If token exists, allow access
  return children;
} */




