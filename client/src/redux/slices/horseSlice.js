import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    { name: "Princess Diana", distance: 0 },
    { name: "Cricket", distance: 0 },
    { name: "Rebel", distance: 0 },
    { name: "Lucy", distance: 0 },
    { name: "Lacey", distance: 0 },
    { name: "Ginger", distance: 0 },
  ],
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
