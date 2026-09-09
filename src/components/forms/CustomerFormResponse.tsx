"use client";

import {
  useState,
} from "react";

import {
  Button,
  Input,
  LoadingState,
} from "../ui";

import Textarea from "../ui/Textarea";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import {
  createFormResponse,
} from "@/src/features/responses/responseThunks";

import type {
  FormSchema,
  FormField,
} from "@/src/types/form";

interface CustomerFormResponseProps {
  form: FormSchema;
  customerId: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function CustomerFormResponse({
  form,
  customerId,
  onSuccess,
  onCancel,
}: CustomerFormResponseProps) {

  const dispatch =
    useAppDispatch();

  const [values, setValues] =
    useState<
      Record<string, string | string[]>
    >({});

  const [submitting, setSubmitting] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const handleChange = (
    fieldId: string,
    value: string
  ) => {
    setValues(prev => ({
      ...prev,
      [fieldId]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent
  ) => {

    event.preventDefault();

    setError(null);

    // Validate required fields
    for (
      const field of form.fields
    ) {

      if (!field.required) {
        continue;
      }

      const value =
        values[field.id];

      if (
        !value ||
        (
          typeof value === "string" &&
          !value.trim()
        )
      ) {
        setError(
          `${field.label} is required.`
        );

        return;
      }
    }

    try {

      setSubmitting(true);

      const answers =
        form.fields.map(
          field => ({
            fieldId:
              field.id,

            value:
              values[field.id] ?? "",
          })
        );

      const result =
        await dispatch(
          createFormResponse({
            formId: form.id,
            customerId,
            answers,
          })
        );

      if (
        createFormResponse.fulfilled.match(
          result
        )
      ) {
        onSuccess();
      } else {
        setError(
          result.payload as string ??
            "Failed to submit response."
        );
      }

    } catch (error) {

      setError(
        error instanceof Error
          ? error.message
          : "Failed to submit response."
      );

    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >

      {error && (
        <div className="rounded-lg bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {form.fields.map(
        field => (
          <DynamicField
            key={field.id}
            field={field}
            value={
              values[field.id] ?? ""
            }
            onChange={value =>
              handleChange(
                field.id,
                value
              )
            }
          />
        )
      )}

      <div className="flex justify-end gap-3 border-t pt-5">

        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={submitting}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          disabled={submitting}
        >
          {submitting
            ? "Submitting..."
            : "Submit Response"}
        </Button>

      </div>

    </form>
  );
}

interface DynamicFieldProps {
  field: FormField;

  value:
    | string
    | string[];

  onChange: (
    value: string
  ) => void;
}

function DynamicField({
  field,
  value,
  onChange,
}: DynamicFieldProps) {

  const stringValue =
    Array.isArray(value)
      ? value.join(", ")
      : value;

  switch (field.type) {

    case "textarea":
      return (
        <Textarea
          label={field.label}
          value={stringValue}
          placeholder={
            field.placeholder
          }
          rows={5}
          required={
            field.required
          }
          onChange={event =>
            onChange(
              event.target.value
            )
          }
        />
      );

    case "select":
      return (
        <div className="space-y-2">

          <label className="block text-sm font-medium text-gray-700">
            {field.label}
            {field.required && (
              <span className="ml-1 text-red-500">
                *
              </span>
            )}
          </label>

          <select
            value={stringValue}
            required={field.required}
            onChange={event =>
              onChange(
                event.target.value
              )
            }
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm focus:border-blue-500 focus:outline-none"
          >

            <option value="">
              Select {field.label}
            </option>

            {field.options?.map(
              option => (
                <option
                  key={
                    option.value
                  }
                  value={
                    option.value
                  }
                >
                  {option.label}
                </option>
              )
            )}

          </select>

        </div>
      );

    case "date":
      return (
        <Input
          label={field.label}
          type="date"
          value={stringValue}
          placeholder={
            field.placeholder
          }
          required={
            field.required
          }
          onChange={event =>
            onChange(
              event.target.value
            )
          }
        />
      );

    case "email":
      return (
        <Input
          label={field.label}
          type="email"
          value={stringValue}
          placeholder={
            field.placeholder
          }
          required={
            field.required
          }
          onChange={event =>
            onChange(
              event.target.value
            )
          }
        />
      );

    case "number":
      return (
        <Input
          label={field.label}
          type="number"
          value={stringValue}
          placeholder={
            field.placeholder
          }
          required={
            field.required
          }
          onChange={event =>
            onChange(
              event.target.value
            )
          }
        />
      );

    default:
      return (
        <Input
          label={field.label}
          type="text"
          value={stringValue}
          placeholder={
            field.placeholder
          }
          required={
            field.required
          }
          onChange={event =>
            onChange(
              event.target.value
            )
          }
        />
      );
  }
}