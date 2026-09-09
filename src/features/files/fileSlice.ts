import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  fetchCustomerFiles,
  uploadFile,
  updateFile,
  deleteFile,
} from "./fileThunks";

import type {
  CustomerFile,
} from "../../types/files";

interface FilesState {
  items: CustomerFile[];
  loading: boolean;
  error: string | null;
}

const initialState: FilesState = {
  items: [],
  loading: false,
  error: null,
};

const fileSlice = createSlice({
  name: "files",

  initialState,

  reducers: {
    /**
     * Clear files error
     */
    clearFilesError: (
      state
    ) => {
      state.error = null;
    },

    /**
     * Clear all files
     */
    clearFiles: (
      state
    ) => {
      state.items = [];
      state.error = null;
    },
  },

  extraReducers: (
    builder
  ) => {
    // ==========================================
    // FETCH FILES
    // ==========================================

    builder
      .addCase(
        fetchCustomerFiles.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        fetchCustomerFiles.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.items =
            action.payload;

          state.error = null;
        }
      )

      .addCase(
        fetchCustomerFiles.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload ??
            "Failed to load files.";
        }
      );

    // ==========================================
    // UPLOAD FILE
    // ==========================================

    builder
      .addCase(
        uploadFile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        uploadFile.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.items.unshift(
            action.payload
          );

          state.error = null;
        }
      )

      .addCase(
        uploadFile.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload ??
            "Failed to upload file.";
        }
      );

    // ==========================================
    // UPDATE FILE
    // ==========================================

    builder
      .addCase(
        updateFile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        updateFile.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          const index =
            state.items.findIndex(
              (file) =>
                file.id ===
                action.payload.id
            );

          if (index !== -1) {
            state.items[index] =
              action.payload;
          }

          state.error = null;
        }
      )

      .addCase(
        updateFile.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload ??
            "Failed to update file.";
        }
      );

    // ==========================================
    // DELETE FILE
    // ==========================================

    builder
      .addCase(
        deleteFile.pending,
        (state) => {
          state.loading = true;
          state.error = null;
        }
      )

      .addCase(
        deleteFile.fulfilled,
        (
          state,
          action
        ) => {
          state.loading = false;

          // Remove deleted file from Redux
          state.items =
            state.items.filter(
              (file) =>
                file.id !== action.payload
            );

          state.error = null;
        }
      )

      .addCase(
        deleteFile.rejected,
        (
          state,
          action
        ) => {
          state.loading = false;

          state.error =
            action.payload ??
            "Failed to delete file.";
        }
      );
  },
});

export const {
  clearFilesError,
  clearFiles,
} = fileSlice.actions;

export default fileSlice.reducer;