import { Customer } from "@/src/types/customer";
import { FormSchema } from "@/src/types/form";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  items: FormSchema[];
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  items: [],
  loading: false,
  error: null,
};

const formSlice = createSlice({
  name: "forms",
  initialState,

  reducers: {
    setForms(
      state,
      action: PayloadAction<FormSchema[]>
    ) {
      state.items = action.payload;
    },

    addForm(
      state,
      action: PayloadAction<FormSchema>
    ) {
      state.items.unshift(action.payload);
    },

    updateForm(
      state,
      action: PayloadAction<FormSchema>
    ) {
      const index = state.items.findIndex(
        form => form.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeForm(
      state,
      action: PayloadAction<string>
    ) {
      state.items = state.items.filter(
        form => form.id !== action.payload
      );
    },

    setLoading(
      state,
      action: PayloadAction<boolean>
    ) {
      state.loading = action.payload;
    },

    setError(
      state,
      action: PayloadAction<string | null>
    ) {
      state.error = action.payload;
    },
  },
});

export const {
  setForms,
  addForm,
  updateForm,
  removeForm,
  setLoading,
  setError,
} = formSlice.actions;

export default formSlice.reducer;