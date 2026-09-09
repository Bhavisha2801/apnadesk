import {
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";

import type {
  FormResponse,
} from "../../types/response";

import {
  fetchFormResponses,
  fetchCustomerFormResponses,
  fetchFormResponse,
  createFormResponse,
} from "./responseThunks";

interface FormResponseState {
  items: FormResponse[];
  selectedResponse:
    | FormResponse
    | null;

  loading: boolean;
  error: string | null;
}

const initialState:
  FormResponseState = {
    items: [],
    selectedResponse: null,
    loading: false,
    error: null,
  };

const formResponseSlice =
  createSlice({
    name: "formResponses",

    initialState,

    reducers: {

      setResponses(
        state,
        action: PayloadAction<
          FormResponse[]
        >
      ) {
        state.items =
          action.payload;
      },

      setSelectedResponse(
        state,
        action: PayloadAction<
          FormResponse | null
        >
      ) {
        state.selectedResponse =
          action.payload;
      },

      clearResponses(state) {
        state.items = [];
        state.selectedResponse =
          null;
      },
    },

    extraReducers: builder => {

      builder

        .addCase(
          fetchFormResponses.pending,
          state => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchFormResponses.fulfilled,
          (state, action) => {
            state.loading = false;
            state.items =
              action.payload;
          }
        )

        .addCase(
          fetchFormResponses.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.error.message ??
              "Failed to load responses.";
          }
        )

        .addCase(
          fetchCustomerFormResponses.pending,
          state => {
            state.loading = true;
            state.error = null;
          }
        )

        .addCase(
          fetchCustomerFormResponses.fulfilled,
          (state, action) => {
            state.loading = false;
            state.items =
              action.payload;
          }
        )

        .addCase(
          fetchCustomerFormResponses.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.error.message ??
              "Failed to load customer responses.";
          }
        )

        .addCase(
          fetchFormResponse.pending,
          state => {
            state.loading = true;
          }
        )

        .addCase(
          fetchFormResponse.fulfilled,
          (state, action) => {
            state.loading = false;
            state.selectedResponse =
              action.payload;
          }
        )

        .addCase(
          fetchFormResponse.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.error.message ??
              "Failed to load response.";
          }
        )

        .addCase(
          createFormResponse.pending,
          state => {
            state.loading = true;
            state.error = null;
          }
        )
        
        .addCase(
          createFormResponse.fulfilled,
          (state, action) => {
            state.items.unshift(
              action.payload
            );

            state.loading = false;
            state.error = null;
          }
        )
        
        .addCase(
          createFormResponse.rejected,
          (state, action) => {
            state.loading = false;
            state.error =
              action.payload as string;
          }
        )

    },
  });

export const {
  setResponses,
  setSelectedResponse,
  clearResponses,
} =
  formResponseSlice.actions;

export default formResponseSlice.reducer;