import { configureStore } from "@reduxjs/toolkit";
import reloadPost from "./reducerPost";

const store = configureStore({
  reducer: {
    reload: reloadPost,
  },
});

export default store;
