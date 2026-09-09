"use client";

import {
  Modal,
} from "../ui";

import type {
  FormSchema,
} from "@/src/types/form";

import CustomerFormResponse from "../forms/CustomerFormResponse";

interface CustomerFormModalProps {
  form: FormSchema | null;
  customerId: string;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CustomerFormModal({
  form,
  customerId,
  onClose,
  onSuccess,
}: CustomerFormModalProps) {

  if (!form) {
    return null;
  }

  return (
    <Modal
      open={Boolean(form)}
      onClose={onClose}
      title={form.name}
      size="lg"
    >

      <div className="mb-6">

        <p className="text-sm text-gray-500">
          {form.description}
        </p>

      </div>

      <CustomerFormResponse
        form={form}
        customerId={customerId}
        onSuccess={onSuccess}
        onCancel={onClose}
      />

    </Modal>
  );
}