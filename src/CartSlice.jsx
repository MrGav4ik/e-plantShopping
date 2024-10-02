import { createSlice } from '@reduxjs/toolkit';
import { act } from 'react';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalQuantity: 0,
  },
  reducers: {
    addItem: (state, action) => {
        const { name, image, cost} = action.payload;
        const existingItem = state.items.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            state.items.push({ name, image, cost, quantity: 1});
        }
        state.totalQuantity++;
    },
    removeItem: (state, action) => {
        const itemToRemove = state.items.find(item => item.name === action.payload);
        if (itemToRemove) {
            state.totalQuantity -= itemToRemove.quantity;
            state.items = state.items.filter(item => item.name !== action.payload);
          }
    },
    increaseItemQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToIncrease = state.items.find(item => item.name === name);
        console.log(state.items);
        if (itemToIncrease) {
          itemToIncrease.quantity += 1;
          state.totalQuantity++;
        }
      },
      decreaseItemQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToDecrease = state.items.find(item => item.name === name);
        if (itemToDecrease && itemToDecrease.quantity > 1) {
          itemToDecrease.quantity -= 1;
          state.totalQuantity--;
        }
      },
    updateQuantity: (state, action) => {
        const { name, quantity } = action.payload;
        const itemToUpdate = state.items.find(item => item.name === name);
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
        }
    },
    updateCart: (state, action) => {
        state.items = action.payload;
        state.totalQuantity = action.payload.reduce((total, item) => total + item.quantity, 0);
      },
  },
});

export const { addItem, removeItem, updateQuantity, updateCart, increaseItemQuantity, decreaseItemQuantity } = CartSlice.actions;

export default CartSlice.reducer;
