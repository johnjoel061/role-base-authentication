//External Lib Import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import LoaderSlice from "../slices/LoaderSlice";

const store = configureStore({
  reducer: {
    Loader: LoaderSlice,
  },
});

export default store;
