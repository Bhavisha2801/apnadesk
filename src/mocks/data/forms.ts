import { FormSchema } from "@/src/types/form";

export const forms: FormSchema[] = [
  {
    id: "f001",
    name: "Customer Feedback",

    description:
      "Collect customer feedback",

    createdAt:
      "2026-08-01T10:00:00Z",

    fields: [
      {
        id: "name",
        type: "text",
        label: "Name",
        required: true,
      },

      {
        id: "email",
        type: "email",
        label: "Email",
        required: true,
      },

      {
        id: "rating",
        type: "select",
        label: "Rating",
        required: true,

        options: [
          { label: "1", value: "1" },
          { label: "2", value: "2" },
          { label: "3", value: "3" },
          { label: "4", value: "4" },
          { label: "5", value: "5" },
        ],
      },

      {
        id: "comments",
        type: "textarea",
        label: "Comments",
        required: false,
      },
    ],
  },
];