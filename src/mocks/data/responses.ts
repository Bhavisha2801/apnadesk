import { FormResponse } from "@/src/types/response";

export const responses: FormResponse[] = [
  // =====================================================
  // FORM f001 - Customer Feedback
  // =====================================================

  {
    id: "r001",
    formId: "f001",
    customerId: "c001",
    submittedAt: "2026-09-08T10:30:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Bhavisha Nayi",
      },
      {
        fieldId: "field-2",
        value: "bhavisha@example.com",
      },
      {
        fieldId: "field-3",
        value: "5",
      },
      {
        fieldId: "field-4",
        value:
          "Excellent experience. Very satisfied with the service.",
      },
    ],
  },

  {
    id: "r002",
    formId: "f001",
    customerId: "c002",
    submittedAt: "2026-09-01T11:00:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Rahul Patel",
      },
      {
        fieldId: "field-2",
        value: "rahul@example.com",
      },
      {
        fieldId: "field-3",
        value: "4",
      },
      {
        fieldId: "field-4",
        value:
          "Good service and quick response.",
      },
    ],
  },

  {
    id: "r003",
    formId: "f001",
    customerId: "c003",
    submittedAt: "2026-08-25T09:15:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Priya Shah",
      },
      {
        fieldId: "field-2",
        value: "priya@example.com",
      },
      {
        fieldId: "field-3",
        value: "5",
      },
      {
        fieldId: "field-4",
        value:
          "Amazing service. I would definitely recommend it.",
      },
    ],
  },

  {
    id: "r004",
    formId: "f001",
    customerId: "c004",
    submittedAt: "2026-08-20T14:30:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Amit Shah",
      },
      {
        fieldId: "field-2",
        value: "amit@example.com",
      },
      {
        fieldId: "field-3",
        value: "3",
      },
      {
        fieldId: "field-4",
        value:
          "The overall experience was good.",
      },
    ],
  },

  // =====================================================
  // FORM f002 - Customer Registration
  // =====================================================

  {
    id: "r005",
    formId: "f002",
    customerId: "c001",
    submittedAt: "2026-08-15T10:30:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Bhavisha",
      },
      {
        fieldId: "field-2",
        value: "Nayi",
      },
      {
        fieldId: "field-3",
        value: "bhavisha@example.com",
      },
      {
        fieldId: "field-4",
        value: "1998-05-10",
      },
    ],
  },

  {
    id: "r006",
    formId: "f002",
    customerId: "c002",
    submittedAt: "2026-08-18T14:00:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Rahul",
      },
      {
        fieldId: "field-2",
        value: "Patel",
      },
      {
        fieldId: "field-3",
        value: "rahul@example.com",
      },
      {
        fieldId: "field-4",
        value: "1995-08-20",
      },
    ],
  },

  {
    id: "r007",
    formId: "f002",
    customerId: "c003",
    submittedAt: "2026-08-22T09:45:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Priya",
      },
      {
        fieldId: "field-2",
        value: "Shah",
      },
      {
        fieldId: "field-3",
        value: "priya@example.com",
      },
      {
        fieldId: "field-4",
        value: "1997-12-15",
      },
    ],
  },

  {
    id: "r008",
    formId: "f002",
    customerId: "c004",
    submittedAt: "2026-08-25T13:20:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "Amit",
      },
      {
        fieldId: "field-2",
        value: "Shah",
      },
      {
        fieldId: "field-3",
        value: "amit@example.com",
      },
      {
        fieldId: "field-4",
        value: "1992-04-12",
      },
    ],
  },

  // =====================================================
  // FORM f003 - Customer Satisfaction
  // =====================================================

  {
    id: "r009",
    formId: "f003",
    customerId: "c001",
    submittedAt: "2026-09-05T11:00:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "very-satisfied",
      },
      {
        fieldId: "field-2",
        value:
          "Excellent experience. The service was very helpful.",
      },
    ],
  },

  {
    id: "r010",
    formId: "f003",
    customerId: "c002",
    submittedAt: "2026-09-03T15:30:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "satisfied",
      },
      {
        fieldId: "field-2",
        value:
          "Good overall experience.",
      },
    ],
  },

  {
    id: "r011",
    formId: "f003",
    customerId: "c003",
    submittedAt: "2026-08-28T12:15:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "neutral",
      },
      {
        fieldId: "field-2",
        value:
          "The experience was okay, but there is room for improvement.",
      },
    ],
  },

  {
    id: "r012",
    formId: "f003",
    customerId: "c004",
    submittedAt: "2026-08-26T16:00:00Z",

    answers: [
      {
        fieldId: "field-1",
        value: "very-satisfied",
      },
      {
        fieldId: "field-2",
        value:
          "Very happy with the service and support.",
      },
    ],
  },
];