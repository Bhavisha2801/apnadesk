"use client";

import {
  useState,
} from "react";

import { useRouter } from "next/navigation";

import {
  Button,
  Input,
  Textarea,
} from "../ui";

import type {
  FormSchema,
  FormField,
  FormFieldType,
} from "@/src/types/form";

interface FormBuilderProps {
  initialForm?: FormSchema;
  onSubmit: (
    data: Omit<
      FormSchema,
      "id" |
      "createdAt" |
      "updatedAt"
    >
  ) => Promise<void>;
}

const fieldTypes: {
  label: string;
  value: FormFieldType;
}[] = [

  {
    label: "Text",
    value: "text",
  },

  {
    label: "Textarea",
    value: "textarea",
  },

  {
    label: "Number",
    value: "number",
  },

  {
    label: "Email",
    value: "email",
  },

  {
    label: "Date",
    value: "date",
  },

  {
    label: "Select",
    value: "select",
  },

  {
    label: "Checkbox",
    value: "checkbox",
  },
];

export default function FormBuilder({
  initialForm,
  onSubmit,
}: FormBuilderProps) {

  const router = useRouter();

  const [
    title,
    setTitle,
  ] = useState(
    initialForm?.name ?? ""
  );

  const [
    description,
    setDescription,
  ] = useState(
    initialForm?.description ?? ""
  );

  const [
    fields,
    setFields,
  ] = useState<FormField[]>(
    initialForm?.fields ?? []
  );

  const [
    saving,
    setSaving,
  ] = useState(false);

  const addField = (
    type: FormFieldType
  ) => {

    const field: FormField = {
      id: `field-${Date.now()}`,
      type,
      label:
        type === "textarea"
          ? "Untitled textarea"
          : "Untitled field",
      placeholder: "",
      required: false,

      ...(type === "select"
        ? {
            options: [
              {
                label: "Option 1",
                value: "option-1",
              },
            ],
          }
        : {}),
    };

    setFields(prev => [
      ...prev,
      field,
    ]);
  };

  const updateField = (
    id: string,
    updates: Partial<FormField>
  ) => {

    setFields(prev =>
      prev.map(field =>
        field.id === id
          ? {
              ...field,
              ...updates,
            }
          : field
      )
    );
  };

  const removeField = (
    id: string
  ) => {

    setFields(prev =>
      prev.filter(
        field =>
          field.id !== id
      )
    );
  };

  const moveField = (
    index: number,
    direction: number
  ) => {

    const newIndex =
      index + direction;

    if (
      newIndex < 0 ||
      newIndex >= fields.length
    ) {
      return;
    }

    const updated = [
      ...fields,
    ];

    const temp =
      updated[index];

    updated[index] =
      updated[newIndex];

    updated[newIndex] =
      temp;

    setFields(updated);
  };

  const handleSubmit =
    async () => {

      if (!title.trim()) {
        return;
      }

      try {

        setSaving(true);

        await onSubmit({
          name: title.trim(),
          description:
            description.trim(),
          fields,
        });

      } finally {
        setSaving(false);
      }
    };

  return (
    <div className="grid grid-cols-[260px_1fr] gap-6">

      {/* FIELD TYPES */}

      <aside className="rounded-lg border bg-white p-4">

        <h2 className="font-semibold">
          Add Field
        </h2>

        <div className="mt-4 space-y-2">

          {fieldTypes.map(
            fieldType => (

              <Button
                key={
                  fieldType.value
                }
                variant="secondary"
                className="w-full justify-start"
                onClick={() =>
                  addField(
                    fieldType.value
                  )
                }
              >
                + {fieldType.label}
              </Button>

            )
          )}

        </div>

      </aside>

      {/* BUILDER */}

      <section className="space-y-5">

        <div className="rounded-lg border bg-white p-5">

          <Input
            label="Form title"
            value={title}
            onChange={event =>
              setTitle(
                event.target.value
              )
            }
            placeholder="Customer registration"
          />

          <div className="mt-4">
            <Textarea
              label="Description"
              value={description}
              onChange={event =>
                setDescription(
                  event.target.value
                )
              }
              placeholder="Describe this form..."
              rows={3}
            />
          </div>

        </div>

        {fields.length === 0 && (

          <div className="rounded-lg border border-dashed p-12 text-center text-gray-500">
            Add fields from the left panel.
          </div>

        )}

        {fields.map(
          (field, index) => (

            <div
              key={field.id}
              className="rounded-lg border bg-white p-5"
            >

              <div className="flex justify-between">

                <div className="text-sm font-medium">
                  {field.type}
                </div>

                <div className="flex gap-2">

                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={
                      index === 0
                    }
                    onClick={() =>
                      moveField(
                        index,
                        -1
                      )
                    }
                  >
                    ↑
                  </Button>

                  <Button
                    size="sm"
                    variant="ghost"
                    disabled={
                      index ===
                      fields.length - 1
                    }
                    onClick={() =>
                      moveField(
                        index,
                        1
                      )
                    }
                  >
                    ↓
                  </Button>

                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() =>
                      removeField(
                        field.id
                      )
                    }
                  >
                    Remove
                  </Button>

                </div>

              </div>

              <div className="mt-4">

                <Input
                  label="Label"
                  value={field.label}
                  onChange={event =>
                    updateField(
                      field.id,
                      {
                        label:
                          event.target
                            .value,
                      }
                    )
                  }
                />

              </div>

              {field.type !==
                "checkbox" && (

                <div className="mt-4">

                  <Input
                    label="Placeholder"
                    value={
                      field.placeholder ??
                      ""
                    }
                    onChange={event =>
                      updateField(
                        field.id,
                        {
                          placeholder:
                            event.target
                              .value,
                        }
                      )
                    }
                  />

                </div>
              )}

              <label className="mt-4 flex items-center gap-2 text-sm">

                <input
                  type="checkbox"
                  checked={
                    field.required
                  }
                  onChange={event =>
                    updateField(
                      field.id,
                      {
                        required:
                          event.target
                            .checked,
                      }
                    )
                  }
                />

                Required

              </label>

              {field.type ===
                "select" && (

                <div className="mt-4">

                  <label className="text-sm font-medium">
                    Options
                  </label>

                  <div className="mt-2 space-y-2">

                    {field.options?.map(
                      (
                        option,
                        optionIndex
                      ) => (

                        <div
                          key={
                            optionIndex
                          }
                          className="flex gap-2"
                        >

                          <Input
                            value={
                              option.label
                            }
                            onChange={
                              event => {

                                const options =
                                  [
                                    ...(field.options ??
                                      []),
                                  ];

                                options[
                                  optionIndex
                                ] = {
                                  ...options[
                                    optionIndex
                                  ],
                                  label:
                                    event
                                      .target
                                      .value,
                                  value:
                                    event
                                      .target
                                      .value
                                      .toLowerCase()
                                      .replace(
                                        /\s+/g,
                                        "-"
                                      ),
                                };

                                updateField(
                                  field.id,
                                  {
                                    options,
                                  }
                                );
                              }
                            }
                          />

                          <Button
                            variant="danger"
                            onClick={() => {

                              const options =
                                (
                                  field.options ??
                                  []
                                ).filter(
                                  (
                                    _,
                                    i
                                  ) =>
                                    i !==
                                    optionIndex
                                );

                              updateField(
                                field.id,
                                {
                                  options,
                                }
                              );
                            }}
                          >
                            ×
                          </Button>

                        </div>

                      )
                    )}

                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => {

                        const options = [
                          ...(field.options ??
                            []),
                          {
                            label:
                              `Option ${
                                (
                                  field.options
                                    ?.length ??
                                  0
                                ) + 1
                              }`,
                            value:
                              `option-${
                                (
                                  field.options
                                    ?.length ??
                                  0
                                ) + 1
                              }`,
                          },
                        ];

                        updateField(
                          field.id,
                          {
                            options,
                          }
                        );
                      }}
                    >
                      Add Option
                    </Button>

                  </div>

                </div>
              )}

            </div>

          )
        )}

        {/* ACTIONS */}

        <div className="flex justify-end gap-3">

          <Button
            variant="secondary"
            onClick={() =>
              router.push("/forms")
            }
          >
            Cancel
          </Button>

          <Button
            onClick={
              handleSubmit
            }
            loading={saving}
          >
            {initialForm
              ? "Save Changes"
              : "Create Form"}
          </Button>

        </div>

      </section>

    </div>
  );
}