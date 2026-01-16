import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems') || '[]') 
    : [],
  itemsPrice: 0,
  shippingPrice: 0,
  taxPrice: 0,
  totalPrice: 0,
};

const addDecimals = (num: number) => {
  return (Math.round(num * 100) / 100).toFixed(2);
}

const updateCart = (state: any) => {
    // Calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc: any, item: any) => acc + item.price * item.qty, 0));
    
    // Calculate shipping price (If order is over Rs. 2000 then free, else Rs. 200 shipping)
    state.shippingPrice = addDecimals(state.itemsPrice > 2000 ? 0 : 200);
    
    // Calculate tax price (15% tax)
    state.taxPrice = addDecimals(Number((0.15 * state.itemsPrice).toFixed(2)));
    
    // Calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    
    return state;
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x: any) => x._id === item._id);

      if (existItem) {
        state.cartItems = state.cartItems.map((x: any) =>
          x._id === existItem._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((x: any) => x._id !== action.payload);
      return updateCart(state);
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.itemsPrice = 0;
      state.shippingPrice = 0;
      state.taxPrice = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cartItems');
      return state;
    }
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
