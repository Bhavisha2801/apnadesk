import { Customer } from "@/src/types/customer";
import { FormResponse } from "@/src/types/response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ResponseState {
  items: FormResponse[];
  loading: boolean;
  error: string | null;
}

const initialState: ResponseState = {
  items: [],
  loading: false,
  error: null,
};

const responseSlice = createSlice({
  name: "responses",
  initialState,

  reducers: {
    setResponses(
      state,
      action: PayloadAction<FormResponse[]>
    ) {
      state.items = action.payload;
    },

    addResponse(
      state,
      action: PayloadAction<FormResponse>
    ) {
      state.items.unshift(action.payload);
    },

    updateResponse(
      state,
      action: PayloadAction<FormResponse>
    ) {
      const index = state.items.findIndex(
        response => response.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeResponse(
      state,
      action: PayloadAction<string>
    ) {
      state.items = state.items.filter(
        response => response.id !== action.payload
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
  setResponses,
  addResponse,
  removeResponse,
  setLoading,
  setError,
} = responseSlice.actions;

export default responseSlice.reducer;