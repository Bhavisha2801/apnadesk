import { apiClient } from "./apiClient";

import type {
  Customer,
  CreateCustomerInput,
} from "../types/customer";

export const customerService = {

  getCustomers() {
    return apiClient<Customer[]>(
      "/customers"
    );
  },

  getCustomer(id: string) {
    return apiClient<Customer>(
      `/customers/${id}`
    );
  },

  createCustomer(
    data: CreateCustomerInput
  ) {
    return apiClient<Customer>(
      "/customers",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updateCustomer(
    id: string,
    data: CreateCustomerInput
  ) {
    return apiClient<Customer>(
      `/customers/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deleteCustomer(id: string) {
    return apiClient<void>(
      `/customers/${id}`,
      {
        method: "DELETE",
      }
    );
  },
};