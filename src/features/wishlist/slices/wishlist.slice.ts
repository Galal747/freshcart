import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface WishlistState {
  ids: string[];
}

const initialState: WishlistState = { ids: [] };

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    setWishlistIds(state, action: PayloadAction<string[]>) {
      state.ids = action.payload;
    },
  },
});

export const { setWishlistIds } = wishlistSlice.actions;
export const wishlistReducer = wishlistSlice.reducer;