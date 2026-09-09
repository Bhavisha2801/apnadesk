import {
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fileService,
} from "../../services/filesService";

import type {
  CustomerFile,
  CreateFileInput,
  UpdateFileInput,
} from "../../types/files";

/**
 * =============================
 * FETCH CUSTOMER FILES
 * =============================
 */
export const fetchCustomerFiles =
  createAsyncThunk<
    CustomerFile[],
    string,
    {
      rejectValue: string;
    }
  >(
    "files/fetchCustomerFiles",
    async (
      customerId,
      { rejectWithValue }
    ) => {
      try {
        const files =
          await fileService.getCustomerFiles(
            customerId
          );

        return files;
      } catch (error) {
        return rejectWithValue(
          error instanceof Error
            ? error.message
            : "Failed to load files."
        );
      }
    }
  );

/**
 * =============================
 * UPLOAD FILE
 * =============================
 */
export const uploadFile =
  createAsyncThunk<
    CustomerFile,
    CreateFileInput,
    {
      rejectValue: string;
    }
  >(
    "files/uploadFile",
    async (
      data,
      { rejectWithValue }
    ) => {
      try {
        const uploadedFile =
          await fileService.uploadFile(
            data
          );

        return uploadedFile;
      } catch (error) {
        return rejectWithValue(
          error instanceof Error
            ? error.message
            : "Failed to upload file."
        );
      }
    }
  );

/**
 * =============================
 * UPDATE FILE
 * =============================
 */
export const updateFile =
  createAsyncThunk<
    CustomerFile,
    {
      id: string;
      data: UpdateFileInput;
    },
    {
      rejectValue: string;
    }
  >(
    "files/updateFile",
    async (
      {
        id,
        data,
      },
      { rejectWithValue }
    ) => {
      try {
        return await fileService.updateFile(
          id,
          data
        );
      } catch (error) {
        return rejectWithValue(
          error instanceof Error
            ? error.message
            : "Failed to update file."
        );
      }
    }
  );

/**
 * =============================
 * DELETE FILE
 * =============================
 */
export const deleteFile = createAsyncThunk<
  string,
  string,
  {
    rejectValue: string;
  }
>(
  "files/deleteFile",
  async (
    fileId,
    { rejectWithValue }
  ) => {
    try {
      await fileService.deleteFile(fileId);

      // Return the deleted ID
      // so Redux knows exactly what to remove.
      return fileId;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Failed to delete file."
      );
    }
  }
);