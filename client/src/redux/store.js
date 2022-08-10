import { configureStore } from "@reduxjs/toolkit";
import horses from "./slices/horseSlice";

export const store = configureStore({
  reducer: {
    horses,
  },
});
