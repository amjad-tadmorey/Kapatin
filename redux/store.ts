import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./slices/authSlice";
import locationReducer from "./slices/locationSlice";


const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["auth"], // persist only auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  location: locationReducer,

});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
