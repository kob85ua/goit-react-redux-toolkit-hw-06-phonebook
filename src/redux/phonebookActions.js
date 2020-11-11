import { v4 as uuidv4 } from "uuid";
import { createAction } from "@reduxjs/toolkit";


const addContact = createAction("phonebook/addContact", (name, number) => ({
  payload: {
    contact: {
      id: uuidv4(),
      name,
      number,
    },
  },
}));

const deleteContact = createAction("phonebook/deleteContact")

const changeFilter = createAction("phonebook/changeFilter")


export default { addContact, deleteContact, changeFilter };
