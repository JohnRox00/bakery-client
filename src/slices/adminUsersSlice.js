import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  usersInfo: localStorage.getItem("usersInfo")
    ? JSON.parse(localStorage.getItem("usersInfo"))
    : null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.usersInfo = action.payload;
      localStorage.setItem("usersInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setUsers } = usersSlice.actions;
export default usersSlice.reducer;
