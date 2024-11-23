import { createSlice } from "@reduxjs/toolkit";
import { nanoid } from "nanoid";

// import persistReducer from "redux-persist/es/persistReducer";
// import storage from "redux-persist/lib/storage";

const initialState = {
  items: [
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ],
};

const slice = createSlice({
  name: "contacts",
  initialState: initialState,
  reducers: {
    addContact: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: (data) => {
        return { payload: { id: nanoid(), ...data } };
      },
    },
    deleteContact: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});
/*THE SAME persistReducer AS IN STORE.JS
const persistConfig = {
  key: "contacts",
  storage,
};
export const persistedReducer = persistReducer(persistConfig, slice.reducer);
*/
// SELECTORS
export const selectContacts = (state) => state.contacts.items;
// ACTIONS
export const { addContact, deleteContact } = slice.actions;
// REDUCER
export default slice.reducer;
