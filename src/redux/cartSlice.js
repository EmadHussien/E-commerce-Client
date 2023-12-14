import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    cartID: null,
    loadFromDb: false,
    saveCartInDb: "init",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total +=
        parseInt(action.payload.price) * parseInt(action.payload.quantity);
      state.saveCartInDb = "save";
    },
    increaseProductQuantity: (state, action) => {
      const { id, color, size } = action.payload;
      const productIndex = state.products.findIndex(
        (p) => p._id === id && p.color === color && p.size === size
      );
      if (productIndex !== -1) {
        state.products[productIndex].quantity += 1;
        state.total += parseInt(state.products[productIndex].price);
      }
      state.saveCartInDb = "save";
    },
    decreaseProductQuantity: (state, action) => {
      const { id, color, size } = action.payload;
      const productIndex = state.products.findIndex(
        (p) => p._id === id && p.color === color && p.size === size
      );
      if (productIndex !== -1) {
        if (state.products[productIndex].quantity > 1) {
          state.products[productIndex].quantity -= 1;
          state.total -= parseInt(state.products[productIndex].price);
        } else {
          state.quantity -= 1;
          state.total -= parseInt(state.products[productIndex].price);
          state.products.splice(productIndex, 1);
        }
      }
      state.saveCartInDb = "save";
    },
    clearCart: (state, action) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
    clearCartAfterPayment: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
      state.saveCartInDb = "save";
    },
    loadCartFromDB: (state, action) => {
      state.products = action.payload.products;
      state.quantity = action.payload.products.length;
      state.total = action.payload.products.reduce((total, product) => {
        const price = parseInt(product.price);
        const quantity = parseInt(product.quantity);

        return total + price * quantity;
      }, 0);
      state.cartID = action.payload._id;
    },
    cartLoaderState: (state, action) => {
      state.loadFromDb = action.payload;
    },
    turnOffCartSaving: (state, action) => {
      state.saveCartInDb = "init";
    },
  },
});

export const {
  addProduct,
  increaseProductQuantity,
  decreaseProductQuantity,
  clearCart,
  loadCartFromDB,
  cartLoaderState,
  turnOffCartSaving,
  clearCartAfterPayment,
} = cartSlice.actions;
export default cartSlice.reducer;
