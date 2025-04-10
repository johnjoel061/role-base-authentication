//External Lib Import
import AppRoutes from "./routes/Routes";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster />
      {/* <FullScreenLoader /> */}
    </>
  );
};

export default App;