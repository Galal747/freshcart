import {
  authReducer,
  InitialState,
} from "@/features/auth/slices/auth.slice";
import {
  cartReducer,
  CartValuesTypes,
} from "@/features/cart/slices/cart.slice";
import {
  wishlistReducer,
  WishlistState,
} from "@/features/wishlist/slices/wishlist.slice";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

export type PreloadedState = {
  authReducer: InitialState;
  cartReducer: CartValuesTypes;
  wishlistReducer?: WishlistState;
};

const rootReducer = combineReducers({
  authReducer,
  cartReducer,
  wishlistReducer,
});

export function createStore(preloadedState: PreloadedState) {
  const myStore = configureStore({
    reducer: rootReducer,
    preloadedState,
  });

  return myStore;
}

export type AppStore = ReturnType<typeof createStore>;
export type AppState = ReturnType<AppStore["getState"]>;