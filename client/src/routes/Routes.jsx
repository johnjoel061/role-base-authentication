import { BrowserRouter } from "react-router-dom";
import AllRoutes from "./index";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <AllRoutes></AllRoutes>
    </BrowserRouter>
  );
};

export default AppRoutes;
