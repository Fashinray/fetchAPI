import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id?: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface CartState {
  items: Product[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
    
  },
});

export const { addToCart, clearCart,  } = cartSlice.actions;
export default cartSlice.reducer;

