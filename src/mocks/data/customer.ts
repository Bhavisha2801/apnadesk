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
    address: "123 Main Street,Ahmedabad, Gujarat, 380001, India",
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
    address: "45 Park Avenue,Vadodara, Gujarat, 390001, India",
    createdAt: "2026-08-05T10:00:00Z",
  },
];