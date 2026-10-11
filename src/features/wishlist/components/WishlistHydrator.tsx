"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/store/store";
import { getWishlist } from "../server/wishlist.action";
import { setWishlistIds } from "../slices/wishlist.slice";

export default function WishlistHydrator() {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(
    (state: AppState) => state.authReducer,
  );

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setWishlistIds([]));
      return;
    }

    getWishlist().then((response) => {
      if (response.status === "success") {
        dispatch(setWishlistIds(response.data.map((p) => p._id)));
      }
    });
  }, [isAuthenticated, dispatch]);

  return null;
}