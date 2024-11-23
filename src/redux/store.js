import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import contactsReducer from "./contactsSlice";
import persistReducer from "redux-persist/es/persistReducer";
import filterReducer from "./filtersSlice";
// import { persistedReducer } from "./contactsSlice";

/*USAGE VANILA REDAX
export const addContact = (name, number) => {
  return {
    type: "contacts/addContact",
    payload: { name, number },
  };
};
export const removeContact = (id) => {
  return {
    type: "contacts/removeContact",
    payload: id,
  };
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "contacts/addContact":
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: [
            ...state.contacts.items,
            {
              id: nanoid(),
              name: action.payload.name,
              number: action.payload.number,
            },
          ],
        },
      };
    case "contacts/removeContact":
      return {
        ...state,
        contacts: {
          items: state.contacts.items.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
*/
/*USAGE createAction & createReducer

export const addContact = createAction("contacts/addContact");
export const deleteContact = createAction("contacts/deleteContact");

const myReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addContact, (state, action) => {
      return {
        ...state,
        contacts: {
          ...state.contacts,
          items: [
            ...state.contacts.items,
            {
              id: nanoid(),
              name: action.payload.name,
              number: action.payload.number,
            },
          ],
        },
      };
    })
    .addCase(deleteContact, (state, action) => {
      return {
        ...state,
        contacts: {
          items: state.contacts.items.filter(
            (item) => item.id !== action.payload
          ),
        },
      };
    });
});
*/
const persistConfig = {
  key: "contacts",
  storage,
};
const persistedReducer = persistReducer(persistConfig, contactsReducer);

export const store = configureStore({
  reducer: { contacts: persistedReducer, filter: filterReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        ignoredPaths: ["register"],
      },
    }),
});

export const persistor = persistStore(store);
