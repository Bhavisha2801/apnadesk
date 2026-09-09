import { Customer } from "@/src/types/customer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CustomerState {
  items: Customer[];
  loading: boolean;
  error: string | null;
}

const initialState: CustomerState = {
  items: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: "customers",
  initialState,

  reducers: {
    setCustomers(
      state,
      action: PayloadAction<Customer[]>
    ) {
      state.items = action.payload;
    },

    addCustomer(
      state,
      action: PayloadAction<Customer>
    ) {
      state.items.unshift(action.payload);
    },

    updateCustomer(
      state,
      action: PayloadAction<Customer>
    ) {
      const index = state.items.findIndex(
        customer => customer.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },

    removeCustomer(
      state,
      action: PayloadAction<string>
    ) {
      state.items = state.items.filter(
        customer => customer.id !== action.payload
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
  setCustomers,
  addCustomer,
  updateCustomer,
  removeCustomer,
  setLoading,
  setError,
} = customerSlice.actions;

export default customerSlice.reducer;