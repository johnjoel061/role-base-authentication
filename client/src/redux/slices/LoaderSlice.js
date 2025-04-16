import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: {
    loading: false,
  },
  reducers: {
    SetLoading: (state) => {
      state.loading = true;
    },
    RemoveLoading: (state) => {
      state.loading = false;
    },
  },
});

// ✅ Export your actions properly
export const { SetLoading, RemoveLoading } = loaderSlice.actions;

// ✅ Export the reducer (usually default)
export default loaderSlice.reducer;
