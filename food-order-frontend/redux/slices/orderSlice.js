import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  total: 0,
  order: [],
  items_counter: 0,
  order_id :'',
};
function calcul_total(produts) {
  return produts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.total,
    0
  );
}
function calcul_items_counter(produts) {
  return produts.reduce(
    (previousValue, currentValue) => previousValue + currentValue.quantity,
    0
  );
}
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    add: (state, action) => {
      //print(state);
      console.log(state.order);
      state.order.push(action.payload);
      state.total = calcul_total(state.order);
      state.items_counter = calcul_items_counter(state.order);
    },
    remove: (state, actions) => {
      let product_id = actions.payload;
      state.order = state.order.filter((product) => product.id !== product_id);
      state.total = calcul_total(state.order);
      state.items_counter = calcul_items_counter(state.order);
    },
    update: (state, actions) => {
      //get product id
      let product_id = actions.payload.order.id;
      let card_products = state.order;
      let item_id = state.order.findIndex((product) => product.id === product_id);
      let product = actions.payload.order;
      let quantity = actions.payload.quantity;
      product = {
        ...product,
        quantity: quantity,
        total: product.price * quantity,
      };
      card_products[item_id] = product;
      state.order = card_products;
      state.total = calcul_total(state.order);
      state.items_counter = calcul_items_counter(state.order);
    },
    setOrderId: (state,action) => {
      state.order_id = action.payload;
    },
    clear: (state) => {
      state.order = [];
      state.total = 0;
      state.items_counter = 0;
    },
  },
});

export const { add, remove, update, clear, setOrderId} = orderSlice.actions;

export const orderAction = orderSlice.actions;
let orderReducer = orderSlice.reducer;

export default orderReducer;
