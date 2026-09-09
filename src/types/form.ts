export type FormFieldType =
  | "text"
  | "email"
  | "number"
  | "date"
  | "select"
  | "radio"
  | "checkbox"
  | "textarea";

export interface FormFieldOption {
  label: string;
  value: string;
}

export interface FormField {
  id: string;
  type: FormFieldType;
  label: string;
  required: boolean;
  placeholder?: string;
  options?: FormFieldOption[];
  min?: number;
  max?: number;
}

export interface FormSchema {
  id: string;
  name: string;
  description?: string;
  fields: FormField[];
  createdAt: string;
  updatedAt?: string;
}

export interface CreateFormInput {
  name: string;
  description?: string;
  fields: FormField[];
}

export type UpdateFormInput = CreateFormInput;