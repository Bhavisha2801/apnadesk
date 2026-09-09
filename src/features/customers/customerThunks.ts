import { createAsyncThunk } from "@reduxjs/toolkit";

import { customerService } from "../../services/customerService";

export const fetchCustomers =
  createAsyncThunk(
    "customers/fetchCustomers",
    async () => {
      return customerService.getCustomers();
    }
  );