const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    add(state, action) {
      const productId = state.find(
        (product) => product.id === action.payload.id
      );
      if (productId) {
        state.find((product) => {
          if (product.id === action.payload.id) {
            return { ...product, count: product.count++ };
          }
          // return;
        });
      } else {
        state.push({ ...action.payload, count: 1 });
      }
    },
    remove(state, action) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const { add, remove } = cartSlice.actions;
export default cartSlice.reducer;
