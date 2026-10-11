import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type User = {
  name: string;
  id?: string;
  email?: string;
  role: string;
};

export type InitalState = { isAuthenticated: boolean; userInfo: null | User };

const initialState: InitalState = { isAuthenticated: false, userInfo: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthStates: function (state, action: PayloadAction<InitalState>) {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.userInfo = action.payload.userInfo;
    },

    logout: function (state) {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
  },
});

export const authReducer = authSlice.reducer;

export const authAction = authSlice.actions;