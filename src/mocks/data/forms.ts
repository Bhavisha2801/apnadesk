import { FormSchema } from "@/src/types/form";

export const forms: FormSchema[] = [
  {
    id: "f001",
    name: "Customer Feedback",
    description: "Collect customer feedback.",
    createdAt: "2026-08-01T10:00:00Z",
    updatedAt: "2026-08-01T10:00:00Z",

    fields: [
      {
        id: "field-1",
        type: "text",
        label: "Name",
        placeholder: "Enter your name",
        required: true,
      },
      {
        id: "field-2",
        type: "email",
        label: "Email",
        placeholder: "Enter your email",
        required: true,
      },
      {
        id: "field-3",
        type: "select",
        label: "Rating",
        required: true,
        options: [
          {
            label: "1",
            value: "1",
          },
          {
            label: "2",
            value: "2",
          },
          {
            label: "3",
            value: "3",
          },
          {
            label: "4",
            value: "4",
          },
          {
            label: "5",
            value: "5",
          },
        ],
      },
      {
        id: "field-4",
        type: "textarea",
        label: "Comments",
        placeholder: "Write your feedback...",
        required: false,
      },
    ],
  },

  {
    id: "f002",
    name: "Customer Registration",
    description: "Basic customer registration form.",
    createdAt: "2026-01-10T10:00:00Z",
    updatedAt: "2026-01-10T10:00:00Z",

    fields: [
      {
        id: "field-1",
        type: "text",
        label: "First Name",
        placeholder: "Enter first name",
        required: true,
      },
      {
        id: "field-2",
        type: "text",
        label: "Last Name",
        placeholder: "Enter last name",
        required: true,
      },
      {
        id: "field-3",
        type: "email",
        label: "Email",
        placeholder: "Enter email",
        required: true,
      },
      {
        id: "field-4",
        type: "date",
        label: "Date of Birth",
        required: false,
      },
    ],
  },

  {
    id: "f003",
    name: "Customer Satisfaction",
    description: "Collect customer satisfaction feedback.",
    createdAt: "2026-02-01T10:00:00Z",
    updatedAt: "2026-02-01T10:00:00Z",

    fields: [
      {
        id: "field-1",
        type: "select",
        label: "How satisfied are you?",
        required: true,
        options: [
          {
            label: "Very satisfied",
            value: "very-satisfied",
          },
          {
            label: "Satisfied",
            value: "satisfied",
          },
          {
            label: "Neutral",
            value: "neutral",
          },
          {
            label: "Unsatisfied",
            value: "unsatisfied",
          },
        ],
      },
      {
        id: "field-2",
        type: "textarea",
        label: "Additional Feedback",
        placeholder: "Write your feedback...",
        required: false,
      },
    ],
  },
];