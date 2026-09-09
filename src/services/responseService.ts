import { apiClient } from "./apiClient";
import type { CreateFormResponseInput, FormResponse } from "@/src/types/response";

export const formResponseService = {
  getFormResponses(formId: string) {
    return apiClient<FormResponse[]>(
      `/forms/${formId}/responses`
    );
  },

  getCustomerFormResponses(
    customerId: string
  ) {
    return apiClient<FormResponse[]>(
      `/customers/${customerId}/form-responses`
    );
  },

  getResponse(responseId: string) {
    return apiClient<FormResponse>(
      `/responses/${responseId}`
    );
  },

  createFormResponse(
    data: CreateFormResponseInput
  ) {
    return apiClient<FormResponse>(
      `/forms/${data.formId}/responses`,
      {
        method: "POST",
        body: JSON.stringify({
          customerId:
            data.customerId,

          answers:
            data.answers,
        }),
      }
    );
  },
};