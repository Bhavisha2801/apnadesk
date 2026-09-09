import { Customer } from "@/src/types/customer";

export const customers: Customer[] = [
  {
    id: "c001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    status: "active",
    dateOfBirth: "1995-01-12",

    address: {
      street: "123 Main Street",
      city: "Ahmedabad",
      state: "Gujarat",
      zipCode: "380001",
      country: "India",
    },

    createdAt: "2026-08-01T10:00:00Z",
  },

  {
    id: "c002",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    status: "active",
    dateOfBirth: "1993-05-18",

    address: {
      street: "45 Park Avenue",
      city: "Vadodara",
      state: "Gujarat",
      zipCode: "390001",
      country: "India",
    },

    createdAt: "2026-08-05T10:00:00Z",
  },
];