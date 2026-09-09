import { configureStore } from "@reduxjs/toolkit";

import customerReducer from "../features/customers/customerSlice";
import formReducer from "../features/forms/formSlice";
import noteReducer from "../features/notes/noteSlice";
import responseReducer from "../features/responses/responseSlice";
import filesReducer from "../features/files/fileSlice";

export const store = configureStore({
  reducer: {
    customers: customerReducer,
    forms: formReducer,
    notes: noteReducer,
    responses: responseReducer,
    files: filesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;