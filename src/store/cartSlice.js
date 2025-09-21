import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const product = action.payload;
            const existing = state.items.find((item) => item.id === product.id);

            if (existing) {
                existing.quantity += 1;
            } else {

                state.items.push({
                    ...product,
                    image: product.images?.[0] || "",
                    quantity: 1,
                });
            }
        },


        increment: (state, action) => {
            const productId = action.payload;
            const existing = state.items.find((item) => item.id === productId);

            if (existing) {
                existing.quantity += 1;
            }
        },

        decrement: (state, action) => {
            const productId = action.payload;
            const existing = state.items.find((item) => item.id === productId);

            if (existing) {
                if (existing.quantity > 1) {
                    existing.quantity -= 1;
                } else {
                    state.items = state.items.filter((item) => item.id !== productId);
                }
            }
        },
        clearCart: (state) => {
            state.items = [];
        }

    },
});

export const { addToCart, increment, decrement, clearCart } =
    cartSlice.actions;
export default cartSlice.reducer;
