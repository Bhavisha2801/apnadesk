import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  formResponseService,
} from "../../services/responseService";
import { CreateFormResponseInput } from "@/src/types/response";

export const fetchFormResponses =
  createAsyncThunk(
    "formResponses/fetchFormResponses",
    async (formId: string) => {
      return formResponseService
        .getFormResponses(formId);
    }
  );

export const fetchCustomerFormResponses =
  createAsyncThunk(
    "formResponses/fetchCustomerFormResponses",
    async (customerId: string) => {
      return formResponseService
        .getCustomerFormResponses(
          customerId
        );
    }
  );

export const fetchFormResponse =
  createAsyncThunk(
    "formResponses/fetchFormResponse",
    async (id: string) => {
      return formResponseService
        .getResponse(id);
    }
  );

  export const createFormResponse =
  createAsyncThunk(
    "responses/createFormResponse",

    async (
      data: CreateFormResponseInput,
      { rejectWithValue }
    ) => {
      try {
        return await formResponseService.createFormResponse(
          data
        );
      } catch (error) {
        return rejectWithValue(
          error instanceof Error
            ? error.message
            : "Failed to submit form response."
        );
      }
    }
  );