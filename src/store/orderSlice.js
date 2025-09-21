import { createSlice } from "@reduxjs/toolkit";

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [], 
  },
  reducers: {
    addOrder: (state, action) => {
      const { items, total } = action.payload;

      state.orders.push({
        items: items.map(item => ({ ...item })), // copy of items
        total,
      });
    },
  },
});

export const { addOrder } = orderSlice.actions;
export default orderSlice.reducer;
