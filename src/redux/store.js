import { configureStore } from "@reduxjs/toolkit";
import InfinityScrollReducers from "./reducers/InfinityScrollReducers";


const customMiddleware = (storeAPI) => (next) => (action) => {
  // console.log("Dispatching action:", action);
  const result = next(action);
  // console.log("Updated state:", storeAPI.getState());
  return result;
};


const store = configureStore({
  reducer: {
   infinityScrollStore:InfinityScrollReducers
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(customMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
