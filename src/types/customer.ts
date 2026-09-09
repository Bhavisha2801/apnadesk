export type CustomerStatus = "active" | "inactive";

export interface CustomerAddress {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Customer {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  dateOfBirth: string;
  address: CustomerAddress;
  createdAt: string;
}

export interface CreateCustomerInput {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: CustomerStatus;
  dateOfBirth: string;
  address: CustomerAddress;
}

export type UpdateCustomerInput = CreateCustomerInput;