import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const horsesSlice = createSlice({
  name: "horses",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = horsesSlice.actions;

export default horsesSlice.reducer;
