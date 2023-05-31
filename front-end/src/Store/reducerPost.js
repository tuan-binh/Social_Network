import { createSlice } from "@reduxjs/toolkit";

const reloadPost = createSlice({
  name: "reload",
  initialState: false,
  reducers: {
    reloadPosts: (state) => {
      return !state;
    },
  },
});

export const { reloadPosts } = reloadPost.actions;
export default reloadPost.reducer;
