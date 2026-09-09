"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  Button,
  EmptyState,
  ErrorState,
  Input,
  LoadingState,
  ConfirmationDialog,
} from "../ui";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchCustomerFiles,
  deleteFile,
} from "@/src/features/files/fileThunks";

import type {
  CustomerFile,
} from "../../types/files";

import FileUploadModal
  from "../files/FileUploadModal";

interface CustomerFilesProps {
  customerId: string;
}

export default function CustomerFiles({
  customerId,
}: CustomerFilesProps) {

  const dispatch =
    useAppDispatch();

  const {
    items: files,
    loading,
    error,
  } = useAppSelector(
    state => state.files
  );

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    modalOpen,
    setModalOpen,
  ] = useState(false);

  const [
    editingFile,
    setEditingFile,
  ] = useState<CustomerFile | null>(
    null
  );

  const [
    deletingFile,
    setDeletingFile,
  ] = useState<CustomerFile | null>(
    null
  );

  const [
    deleting,
    setDeleting,
  ] = useState(false);

  useEffect(() => {

    dispatch(
      fetchCustomerFiles(
        customerId
      )
    );

  }, [
    customerId,
    dispatch,
  ]);

  const customerFiles =
    useMemo(() => {

      const value =
        search
          .trim()
          .toLowerCase();

      return files.filter(
        file => {

          if (!value) {
            return true;
          }

          return (
            file.name
              .toLowerCase()
              .includes(value) ||
            file.type
              .toLowerCase()
              .includes(value)
          );
        }
      );

    }, [files, search]);

  const openCreate =
    () => {
      setEditingFile(null);
      setModalOpen(true);
    };

  const openEdit =
    (file: CustomerFile) => {
      setEditingFile(file);
      setModalOpen(true);
    };

  const handleDelete =
    async () => {

      if (!deletingFile) {
        return;
      }

      try {

        setDeleting(true);

        const result =
          await dispatch(
            deleteFile(
              deletingFile.id
            )
          );

        if (
          deleteFile.fulfilled.match(
            result
          )
        ) {

          // dispatch(
          //   deleteFile(
          //     deletingFile.id
          //   )
          // );

          setDeletingFile(null);
          return;

        }

      } finally {
        setDeleting(false);
      }
    };

  const formatSize =
    (size: number) => {

      if (!size) {
        return "0 KB";
      }

      const kb =
        size / 1024;

      if (kb < 1024) {
        return `${kb.toFixed(1)} KB`;
      }

      return `${(
        kb / 1024
      ).toFixed(1)} MB`;
    };

  if (
    loading &&
    files.length === 0
  ) {
    return (
      <LoadingState
        message="Loading files..."
      />
    );
  }

  if (
    error &&
    files.length === 0
  ) {
    return (
      <ErrorState
        title="Unable to load files"
        message={error}
        action={
          <Button
            onClick={() =>
              dispatch(
                fetchCustomerFiles(
                  customerId
                )
              )
            }
          >
            Try Again
          </Button>
        }
      />
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold">
            Files
          </h2>

          <p className="text-sm text-gray-500">
            Manage files associated with this customer.
          </p>
        </div>

        <Button
          onClick={openCreate}
        >
          Upload File
        </Button>

      </div>

      {/* Search */}

      <Input
        label="Search"
        placeholder="Search files..."
        value={search}
        onChange={event =>
          setSearch(
            event.target.value
          )
        }
      />

      {/* Files */}

      {customerFiles.length ===
      0 ? (

        <EmptyState
          title="No files found"
          description={
            search
              ? "Try changing your search."
              : "Upload the first file for this customer."
          }
          action={
            !search ? (
              <Button
                onClick={
                  openCreate
                }
              >
                Upload File
              </Button>
            ) : undefined
          }
        />

      ) : (

        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">

          <div className="divide-y">

            {customerFiles.map(
              file => (

                <div
                  key={file.id}
                  className="flex items-center justify-between gap-4 p-4 hover:bg-gray-50"
                >

                  <div className="min-w-0">

                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate font-medium text-blue-600 hover:underline"
                    >
                      {file.name}
                    </a>

                    <div className="mt-1 text-xs text-gray-500">
                      {file.type}
                      {" · "}
                      {formatSize(
                        file.size
                      )}
                      {" · "}
                      Uploaded by{" "}
                      {file.uploadedBy}
                    </div>

                    <div className="mt-1 text-xs text-gray-400">
                      {new Date(
                        file.uploadedAt
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </div>

                  </div>

                  <div className="flex shrink-0 gap-2">

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        openEdit(
                          file
                        )
                      }
                    >
                      Edit
                    </Button>

                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() =>
                        setDeletingFile(
                          file
                        )
                      }
                    >
                      Delete
                    </Button>

                  </div>

                </div>

              )
            )}

          </div>

        </div>

      )}

      {/* Upload/Edit */}

      <FileUploadModal
        open={modalOpen}
        customerId={
          customerId
        }
        file={
          editingFile
        }
        onClose={() => {
          setModalOpen(false);
          setEditingFile(null);
        }}
        onSuccess={() => {
          setModalOpen(false);
          setEditingFile(null);
        }}
      />

      {/* Delete */}

      <ConfirmationDialog
        open={Boolean(
          deletingFile
        )}
        title="Delete file?"
        message={`Are you sure you want to delete "${deletingFile?.name}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        loading={deleting}
        onConfirm={
          handleDelete
        }
        onClose={() => {
          if (!deleting) {
            setDeletingFile(null);
          }
        }}
      />

    </div>
  );
}