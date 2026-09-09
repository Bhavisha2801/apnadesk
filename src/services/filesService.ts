import type {
  CustomerFile,
  CreateFileInput,
  UpdateFileInput,
} from "../types/files";

const API_BASE_URL = "/api";

/**
 * =============================
 * GET CUSTOMER FILES
 * =============================
 */
const getCustomerFiles = async (
  customerId: string
): Promise<CustomerFile[]> => {
  const response = await fetch(
    `${API_BASE_URL}/customers/${customerId}/files`,
    {
      method: "GET",
    }
  );

  if (!response.ok) {
    const error =
      await response.json().catch(
        () => null
      );

    throw new Error(
      error?.message ||
        "Failed to load files."
    );
  }

  const data =
    await response.json();

  return data.items ?? data;
};

/**
 * =============================
 * UPLOAD FILE
 * =============================
 */
const uploadFile = async (
  data: CreateFileInput
): Promise<CustomerFile> => {
  const formData = new FormData();

  formData.append(
    "file",
    data.file
  );

  formData.append(
    "uploadedBy",
    data.uploadedBy
  );

  const response = await fetch(
    `${API_BASE_URL}/customers/${data.customerId}/files`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    const error =
      await response.json().catch(
        () => null
      );

    throw new Error(
      error?.message ||
        "Failed to upload file."
    );
  }

  const result =
    await response.json();

  return result.newFile ?? result;
};

/**
 * =============================
 * UPDATE FILE
 * =============================
 */
const updateFile = async (
  id: string,
  data: UpdateFileInput
): Promise<CustomerFile> => {
  const formData =
    new FormData();

  if (data.file) {
    formData.append(
      "file",
      data.file
    );
  }

  formData.append(
    "uploadedBy",
    data.uploadedBy ?? "Admin"
  );

  const response =
    await fetch(
      `/api/files/${id}`,
      {
        method: "PUT",
        body: formData,
      }
    );

  if (!response.ok) {
    const error =
      await response.json()
        .catch(() => null);

    throw new Error(
      error?.message ||
        "Failed to update file."
    );
  }

  const result =
    await response.json();

  return (
    result.updatedFile ??
    result
  );
};

/**
 * =============================
 * DELETE FILE
 * =============================
 */
const deleteFile = async (
  fileId: string
): Promise<void> => {
  const response =
    await fetch(
      `/api/files/${fileId}`,
      {
        method: "DELETE",
      }
    );

  if (!response.ok) {
    const error =
      await response.json()
        .catch(() => null);

    throw new Error(
      error?.message ||
        "Failed to delete file."
    );
  }
};

export const fileService = {
  getCustomerFiles,
  uploadFile,
  updateFile,
  deleteFile,
};