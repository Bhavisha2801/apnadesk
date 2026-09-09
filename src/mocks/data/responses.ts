import { FormResponse } from "@/src/types/response";

export const responses: FormResponse[] = [
  {
    id: "r001",
    formId: "f001",
    customerId: "c001",
    submittedAt: "2026-09-08T10:30:00Z",

    answers: {
      name: "John Doe",
      email: "john@example.com",
      rating: "5",
      comments: "Excellent service",
    },
  },

  {
    id: "r002",
    formId: "f001",
    customerId: "c001",
    submittedAt: "2026-09-01T11:00:00Z",

    answers: {
      name: "John Doe",
      email: "john@example.com",
      rating: "4",
      comments: "Very good",
    },
  },
];