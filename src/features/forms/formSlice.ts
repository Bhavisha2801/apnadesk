import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type {
  FormSchema,
} from "@/src/types/form";

import {
  fetchForms,
  fetchForm,
  createForm,
  updateForm,
  deleteForm,
} from "./formThunks";

interface FormState {
  items: FormSchema[];
  selectedForm: FormSchema | null;
  loading: boolean;
  error: string | null;
}

const initialState: FormState = {
  items: [],
  selectedForm: null,
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
      state.items =
        action.payload;
    },

    setSelectedForm(
      state,
      action: PayloadAction<FormSchema | null>
    ) {
      state.selectedForm =
        action.payload;
    },

    addForm(
      state,
      action: PayloadAction<FormSchema>
    ) {
      state.items.unshift(
        action.payload
      );
    },

    updateFormLocal(
      state,
      action: PayloadAction<FormSchema>
    ) {
      const index =
        state.items.findIndex(
          form =>
            form.id ===
            action.payload.id
        );

      if (index !== -1) {
        state.items[index] =
          action.payload;
      }

      if (
        state.selectedForm?.id ===
        action.payload.id
      ) {
        state.selectedForm =
          action.payload;
      }
    },

    removeForm(
      state,
      action: PayloadAction<string>
    ) {
      state.items =
        state.items.filter(
          form =>
            form.id !==
            action.payload
        );

      if (
        state.selectedForm?.id ===
        action.payload
      ) {
        state.selectedForm = null;
      }
    },

    clearFormError(state) {
      state.error = null;
    },
  },

  extraReducers: builder => {

    builder

      // GET FORMS
      .addCase(
        fetchForms.pending,
        state => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchForms.fulfilled,
        (state, action) => {
          state.loading = false;
          state.items =
            action.payload;
        }
      )

      .addCase(
        fetchForms.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Failed to load forms.";
        }
      )

      // GET SINGLE FORM
      .addCase(
        fetchForm.pending,
        state => {
          state.loading = true;
        }
      )

      .addCase(
        fetchForm.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectedForm =
            action.payload;
        }
      )

      .addCase(
        fetchForm.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Failed to load form.";
        }
      )

      // CREATE
      .addCase(
        createForm.pending,
        state => {
          state.loading = true;
        }
      )

      .addCase(
        createForm.fulfilled,
        (state, action) => {
          state.loading = false;

          state.items.unshift(
            action.payload
          );
        }
      )

      .addCase(
        createForm.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Failed to create form.";
        }
      )

      // UPDATE
      .addCase(
        updateForm.pending,
        state => {
          state.loading = true;
        }
      )

      .addCase(
        updateForm.fulfilled,
        (state, action) => {
          state.loading = false;

          const index =
            state.items.findIndex(
              form =>
                form.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.items[index] =
              action.payload;
          }

          state.selectedForm =
            action.payload;
        }
      )

      .addCase(
        updateForm.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Failed to update form.";
        }
      )

      // DELETE
      .addCase(
        deleteForm.pending,
        state => {
          state.loading = true;
        }
      )

      .addCase(
        deleteForm.fulfilled,
        (state, action) => {
          state.loading = false;

          state.items =
            state.items.filter(
              form =>
                form.id !==
                action.payload
            );
        }
      )

      .addCase(
        deleteForm.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.error.message ??
            "Failed to delete form.";
        }
      );
  },
});

export const {
  setForms,
  setSelectedForm,
  addForm,
  updateFormLocal,
  removeForm,
  clearFormError,
} = formSlice.actions;

export default formSlice.reducer;