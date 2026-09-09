import { createAsyncThunk } from "@reduxjs/toolkit";

import { formService } from "@/src/services/formService";

import type {
  CreateFormInput,
} from "@/src/types/form";

export const fetchForms =
  createAsyncThunk(
    "forms/fetchForms",
    async () => {
      return formService.getForms();
    }
  );

export const fetchForm =
  createAsyncThunk(
    "forms/fetchForm",
    async (id: string) => {
      return formService.getForm(id);
    }
  );

export const createForm =
  createAsyncThunk(
    "forms/createForm",
    async (
      data: CreateFormInput
    ) => {
      return formService.createForm(
        data
      );
    }
  );

export const updateForm =
  createAsyncThunk(
    "forms/updateForm",
    async ({
      id,
      data,
    }: {
      id: string;
      data: CreateFormInput;
    }) => {
      return formService.updateForm(
        id,
        data
      );
    }
  );

export const deleteForm =
  createAsyncThunk(
    "forms/deleteForm",
    async (id: string) => {
      await formService.deleteForm(id);

      return id;
    }
  );