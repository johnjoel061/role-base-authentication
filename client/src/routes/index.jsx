import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LazyLoader from "../components/Common/LazyLoader";
import DefaultLayout from "../layouts/DefaultLayout";

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));
const ForgetPassword = React.lazy(() => import("../pages/Account/ForgetPassword"));

// Sample dashboard components
const AdminDashboard = React.lazy(() => import("../pages/Dashboard/AdminDashboard"));

// Utility for loading components
const LoadComponent = ({ component: Component }) => <Component />;

// Read user from localStorage safely
let AccessToken = null;
let UserDetails = null;

try {
  const user_data = localStorage.getItem("user_data");
  
  // If user_data exists and is not empty, parse it
  if (user_data) {
    const parsedUserData = JSON.parse(user_data);
    AccessToken = parsedUserData?.accessToken;
    UserDetails = parsedUserData?.user;
  }
} catch (error) {
  console.error("Error parsing user data:", error);
}

const AllRoutes = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Routes>
        {AccessToken && UserDetails?.Role === "ADMIN" && (
          <Route path="/" element={<DefaultLayout />}>
            {/* 👇 Redirect from / to /dashboard */}
            <Route index element={<Navigate to="/dashboard" />} />
            <Route
              path="dashboard"
              element={<LoadComponent component={AdminDashboard} />}
            />
            <Route path="*" element={<Navigate to="/dashboard" />} />
          </Route>
        )}

        {/* Public routes */}
        {!AccessToken && (
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Navigate to="/account/login" />} />
            <Route
              path="account/login"
              element={<LoadComponent component={Login} />}
            />
            <Route
              path="account/forget-password"
              element={<LoadComponent component={ForgetPassword} />}
            />
            <Route path="*" element={<Navigate to="/account/login" />} />
          </Route>
        )}
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
