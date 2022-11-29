import { combineReducers, configureStore } from "@reduxjs/toolkit";
import orderReducer from "./slices/orderSlice";
import loginReducer from "./slices/loginSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { getDefaultMiddleware } from "@reduxjs/toolkit";
import { createWrapper} from 'next-redux-wrapper';
// let reducers = { reducer: { order: orderReducer }, };
const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});
const persistConfig = { key: "root", storage, };
// combine reducers
let CombineReducers = combineReducers({
  order: orderReducer,
  login: loginReducer,
});
// persist reducers
let myStore = ()=>{
  const persistedReducer = persistReducer(persistConfig, CombineReducers);
  let reducers = combineReducers({
    order: persistedReducer,
  });
  let store = configureStore({
    reducer: { reducers, },
    //reducer:  reducers,
    middleware: customizedMiddleware,
  });
  store._persistor = persistStore(store);
  return store;
}
//export const persistor = persistStore(store);
export const wrapper = createWrapper(myStore);
export default myStore;