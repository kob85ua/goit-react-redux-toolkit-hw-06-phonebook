import { combineReducers } from "redux";

import { createReducer } from '@reduxjs/toolkit';

import phonebookActions from "./phonebookActions";


const contacts = createReducer([], {
  [phonebookActions.addContact]:(state, action)=>[action.payload.contact, ...state],
  [phonebookActions.deleteContact]:(state, action)=>(state.filter(({ id }) => id !== action.payload))

})
const filter = createReducer("", {
  [phonebookActions.changeFilter]:(state, action)=>(action.payload ? action.payload : ""),
})



export default combineReducers({ contacts, filter });
