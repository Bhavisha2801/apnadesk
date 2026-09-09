"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Button,
  Modal,
} from "../ui";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import {
  uploadFile,
  updateFile,
} from "@/src/features/files/fileThunks";

import type {
  CustomerFile,
} from "@/src/types/files";

interface FileUploadModalProps {
  open: boolean;
  customerId: string;
  file?: CustomerFile | null;
  onClose: () => void;
  onSuccess: () => void;
}

const MAX_FILE_SIZE =
  10 * 1024 * 1024;

const ACCEPTED_FILE_TYPES =
  [
    "image/*",
    "application/pdf",
    "video/*",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "text/plain",
  ].join(",");

export default function FileUploadModal({
  open,
  customerId,
  file,
  onClose,
  onSuccess,
}: FileUploadModalProps) {
  const dispatch =
    useAppDispatch();

  const inputRef =
    useRef<HTMLInputElement | null>(
      null
    );

  const [
    selectedFile,
    setSelectedFile,
  ] = useState<File | null>(null);

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState<string | null>(
    null
  );

  const isEditing =
    Boolean(file);

  // ==========================================
  // RESET WHEN MODAL OPENS/CLOSES
  // ==========================================

  useEffect(() => {
    if (!open) {
      return;
    }

    setSelectedFile(null);
    setError(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [open, file]);

  // ==========================================
  // FILE SELECTION
  // ==========================================

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setError(null);

    const selected =
      event.target.files?.[0];

    if (!selected) {
      setSelectedFile(null);
      return;
    }

    // File size validation

    if (
      selected.size >
      MAX_FILE_SIZE
    ) {
      setError(
        "File size must be less than 10 MB."
      );

      event.target.value = "";

      setSelectedFile(null);

      return;
    }

    setSelectedFile(selected);
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError(null);

    // ========================================
    // CREATE
    // ========================================

    if (!isEditing) {
      if (!selectedFile) {
        setError(
          "Please choose a file."
        );

        return;
      }
    }

    try {
      setSaving(true);

      // ========================================
      // UPDATE
      // ========================================

      if (file) {
        const result =
          await dispatch(
            updateFile({
              id: file.id,

              data: {
                file:
                  selectedFile ??
                  undefined,

                uploadedBy:
                  file.uploadedBy ??
                  "Admin",
              },
            })
          );

        if (
          updateFile.fulfilled.match(
            result
          )
        ) {
          onSuccess();
          return;
        }

        setError(
          (result.payload as string) ||
            "Failed to update file."
        );

        return;
      }

      // ========================================
      // CREATE / UPLOAD
      // ========================================

      const result =
        await dispatch(
          uploadFile({
            customerId,

            file: selectedFile!,

            uploadedBy: "Admin",
          })
        );

      if (
        uploadFile.fulfilled.match(
          result
        )
      ) {
        onSuccess();
        return;
      }

      setError(
        (result.payload as string) ||
          "Failed to upload file."
      );
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Something went wrong."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // CLOSE
  // ==========================================

  const handleClose = () => {
    if (saving) {
      return;
    }

    onClose();
  };

  // ==========================================
  // FORMAT FILE SIZE
  // ==========================================

  const formatFileSize = (
    size: number
  ) => {
    if (size < 1024) {
      return `${size} B`;
    }

    if (size < 1024 * 1024) {
      return `${(
        size / 1024
      ).toFixed(1)} KB`;
    }

    return `${(
      size /
      (1024 * 1024)
    ).toFixed(1)} MB`;
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={
        isEditing
          ? "Edit File"
          : "Upload File"
      }
      size="md"
    >
      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* ERROR */}

        {error && (
          <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* CURRENT FILE */}

        {isEditing &&
          file &&
          !selectedFile && (
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-xs font-medium uppercase text-gray-500">
                Current File
              </p>

              <p className="mt-1 font-medium text-gray-900">
                {file.name}
              </p>

              <p className="mt-1 text-sm text-gray-500">
                {file.type.toUpperCase()}{" "}
                •{" "}
                {formatFileSize(
                  file.size
                )}
              </p>
            </div>
          )}

        {/* FILE INPUT */}

        <div>
          <label
            htmlFor="file-upload"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            {isEditing
              ? "Choose Replacement File"
              : "Choose File"}
          </label>

          <input
            ref={inputRef}
            id="file-upload"
            type="file"
            accept={
              ACCEPTED_FILE_TYPES
            }
            disabled={saving}
            onChange={
              handleFileChange
            }
            className="block w-full cursor-pointer rounded-lg border border-gray-300 bg-white text-sm text-gray-700 file:mr-4 file:border-0 file:bg-gray-100 file:px-4 file:py-2 file:text-sm file:font-medium"
          />

          <p className="mt-2 text-xs text-gray-500">
            Maximum file size: 10 MB
          </p>
        </div>

        {/* SELECTED FILE */}

        {selectedFile && (
          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-medium text-gray-900">
                  {selectedFile.name}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {selectedFile.type ||
                    "Unknown type"}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {formatFileSize(
                    selectedFile.size
                  )}
                </p>
              </div>

              <button
                type="button"
                disabled={saving}
                onClick={() => {
                  setSelectedFile(
                    null
                  );

                  if (
                    inputRef.current
                  ) {
                    inputRef.current.value =
                      "";
                  }
                }}
                className="text-sm font-medium text-red-600 hover:text-red-700"
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* FOOTER */}

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-5">
          <Button
            type="button"
            variant="outline"
            disabled={saving}
            onClick={handleClose}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            disabled={
              saving ||
              (!isEditing &&
                !selectedFile)
            }
          >
            {saving
              ? isEditing
                ? "Updating..."
                : "Uploading..."
              : isEditing
              ? "Update File"
              : "Upload File"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}