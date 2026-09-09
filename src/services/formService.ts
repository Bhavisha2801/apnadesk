import { apiClient } from "./apiClient";

import type {
  FormSchema,
  CreateFormInput,
} from "@/src/types/form";

export const formService = {

  getForms() {
    return apiClient<FormSchema[]>(
      "/forms"
    );
  },

  getForm(id: string) {
    return apiClient<FormSchema>(
      `/forms/${id}`
    );
  },

  createForm(data: CreateFormInput) {
    return apiClient<FormSchema>(
      "/forms",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updateForm(
    id: string,
    data: CreateFormInput
  ) {
    return apiClient<FormSchema>(
      `/forms/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deleteForm(id: string) {
    return apiClient<void>(
      `/forms/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};