import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";
import loginReducer from "./slices/loginSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
// let reducers = { reducer: { order: orderReducer }, };
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const persistConfig = {
  key: "root",
  storage,
};
// combine reducers
let CombineReducers = combineReducers({
  order: orderReducer,
  login: loginReducer,
});
// persist reducers
const persistedReducer = persistReducer(persistConfig, CombineReducers);
let reducers = combineReducers({
  order: persistedReducer,
});
const store = configureStore({
  reducer: {
    reducers,
  },
  middleware: customizedMiddleware,
});

export const persistor = persistStore(store);
export default store;