import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/authSlice";
import product from "./features/productSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
const persistConfig = {
  key: "root",
  storage,
};
const rootReducer = combineReducers({
  auth: AuthReducer,
  product: product,
});
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default configureStore({
  reducer: persistedReducer,
});
export const store = configureStore({
  reducer: persistedReducer,
});
export const persistor = persistStore(store);
