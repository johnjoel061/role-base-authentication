import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LazyLoader from "../components/Common/LazyLoader";
import DefaultLayout from "../layouts/DefaultLayout";

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));
const ForgetPassword = React.lazy(() => import("../pages/Account/ForgetPassword"));

const AllRoutes = () => {
  return (
    <Suspense fallback={<LazyLoader />}>
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route index element={<Navigate to="/account/login" />} />
          <Route path="/account/login" element={<Login />} />
          <Route path="/account/forget-password" element={<ForgetPassword />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/account/login" />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AllRoutes;
