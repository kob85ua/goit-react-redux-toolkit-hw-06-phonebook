import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import phonebookReducer from "./phonebookReducer";

const rootReducer = combineReducers({ phonebook: phonebookReducer });

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};



const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
});
store.subscribe(() => {
  localStorage.setItem("reduxState", JSON.stringify(store.getState()));
});

export default store;
