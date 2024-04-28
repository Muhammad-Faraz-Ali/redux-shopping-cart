const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts", //Action type
  async (args, { rejectWithValue }) => {
    //Async func
    console.log("index args", args);
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      return data;
    } catch (erro) {
      return rejectWithValue("Error");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    data: [],
    status: STATUSES.IDLE,
  },
  //   reducers: {
  //     setProducts(state, action) {
  //       console.log("index", action);
  //       state.data = action.payload;
  //     },
  //     setStatus(state, action) {
  //       state.status = action.payload;
  //     },
  //   },
  extraReducers: (builder) => {
    // Way-1 :Using builder API/tool
    console.log("index builder", builder);
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        console.log("index-p", action);
        console.log("index action", fetchProducts.pending);
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
  //   extraReducers: {
  //     //Way-2 (Define fetchProducts before creating a slice)
  //     [fetchProducts.pending]: (state, action) => {
  //       console.log("index action-p", action);
  //       state.status = STATUSES.LOADING;
  //     },
  //     [fetchProducts.fulfilled]: (state, action) => {
  //       console.log("index action-f", action);
  //       state.data = action.payload;
  //       state.status = STATUSES.IDLE;
  //     },
  //     [fetchProducts.rejected]: (state, action) => {
  //       console.log("index action-r", action);
  //       state.status = STATUSES.ERROR;
  //     },
  //   },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunk-By RTK
// export const fetchProducts = createAsyncThunk(
//   "product/fetchProducts",
//   async () => {
//     const res = await fetch("https://fakestoreapi.com/products");
//     const data = await res.json();
//     return data;
//   }
// );

//Thunk by dev
// export function fetchProducts() {
//   return async function fetchProductThunk(dispatch, getState) {
//     dispatch(setStatus(STATUSES.LOADING));
//     try {
//       const res = await fetch("https://fakestoreapi.com/products");
//       const data = await res.json();
//       dispatch(setProducts(data));
//       dispatch(setStatus(STATUSES.IDLE));
//     } catch (err) {
//       console.log(err);
//       dispatch(setStatus(STATUSES.ERROR));
//     }
//   };
// }
