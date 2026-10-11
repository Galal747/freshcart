import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartProductItem } from "../types/cart.types";

export type CartValuesTypes = {
  status: string;
  message: string;
  numOfCartItems: number;
  cartId: null | string;
  data: {
    products: CartProductItem[];
    totalCartPrice: number;
  };
};

export const cartInitialValues: CartValuesTypes = {
  status: "",
  message: "",
  numOfCartItems: 0,
  cartId: null,
  data: {
    products: [],
    totalCartPrice: 0,
  },
};

const cartSlice = createSlice({
  name: "cart",
  initialState: cartInitialValues,
  reducers: {
    setCartSummary(
      state,
      action: PayloadAction<{ numOfCartItems: number; totalCartPrice?: number }>,
    ) {
      state.numOfCartItems = action.payload.numOfCartItems;
      if (action.payload.totalCartPrice !== undefined) {
        state.data.totalCartPrice = action.payload.totalCartPrice;
      }
    },
    clearCartState(state) {
      state.numOfCartItems = 0;
      state.data.products = [];
      state.data.totalCartPrice = 0;
    },
  },
});

export const { setCartSummary, clearCartState } = cartSlice.actions;
export const cartReducer = cartSlice.reducer;