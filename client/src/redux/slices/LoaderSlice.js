// redux/slices/loaderSlice.js
import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "Loader",
  initialState: {
    IsLoading: false,
  },
  reducers: {
    showLoader: (state) => {
      state.IsLoading = true;
    },
    hideLoader: (state) => {
      state.IsLoading = false;
    },
  },
});

export const { showLoader, hideLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
