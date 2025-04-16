import React, { useEffect, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import LazyLoader from "../components/Common/LazyLoader";
import DefaultLayout from "../layouts/DefaultLayout";

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<Navigate to="/account/login" />} />
        <Route path="/account/login" element={<Suspense fallback={<LazyLoader />}><Login /></Suspense>} />
        <Route path="*" element={<Navigate to="/account/login" />} />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
