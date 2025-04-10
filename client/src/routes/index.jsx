import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

// All layouts/containers
import DefaultLayout from "../layouts/Default";

//External Lib Import

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));


const LoadComponent = ({ component: Component }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <Component />;
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<Navigate to="/account/login" />} />
        <Route path="*" element={<Navigate to="/account/login" />} />
        <Route
          path="/account/login"
          element={<LoadComponent component={Login} />}
        />
      </Route>
    </Routes>
  );
};

export default AllRoutes;
