import { Product } from "@/app/utils/typings";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type CartState = {
  products: Product[];
};

const initialState: CartState = {
  products: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    reset: () => initialState,
    addToCart: (state, { payload }: PayloadAction<Product>) => {
      const existingProduct = state.products.find((product) => {
        return product.id === payload.id;
      });

      if (existingProduct) {
        state.products = state.products.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: product.quantity! + 1 }
            : product
        );
      } else {
        state.products = [...state.products, { ...payload, quantity: 1 }];
      }
    },
    removeFromCart: (state, { payload }: PayloadAction<Product>) => {
      const existingProduct = state.products.find((product) => {
        return product.id === payload.id;
      });
      if (existingProduct!.quantity === 1) {
        state.products = state.products.filter(
          (product) => product.id !== existingProduct!.id
        );
      } else {
        state.products = state.products.map((product) =>
          product.id === payload.id
            ? { ...product, quantity: product.quantity! - 1 }
            : product
        );
      }
    },
  },
});

export const { addToCart, removeFromCart, reset } = cart.actions;

export default cart.reducer;
