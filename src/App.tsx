import { Suspense, useEffect } from "react";
import {
  useRoutes,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import routes from "tempo-routes";
import AdminLayout from "./components/layout/AdminLayout";
import AuthLayout from "./components/auth/AuthLayout";
import LoginForm from "./components/auth/LoginForm";
import Dashboard from "./components/dashboard";
import StampCards from "./components/stamp-cards";
import GiftCards from "./components/gift-cards";
import Customers from "./components/customers";
import Orders from "./components/orders";
import Settings from "./components/settings";

function App() {
  const navigate = useNavigate();
  // Check authentication state from localStorage
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated && window.location.pathname !== "/login") {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <AuthLayout>
                  <LoginForm />
                </AuthLayout>
              )
            }
          />

          {/* Protected Routes */}
          <Route
            element={
              isAuthenticated ? (
                <AdminLayout />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/stamp-cards" element={<StampCards />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/settings" element={<Settings />} />
          </Route>

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
