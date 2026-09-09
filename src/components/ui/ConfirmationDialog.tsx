"use client";

import Modal from "./Modal";
import Button from "./Button";

interface ConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;

  title?: string;
  message?: string;

  confirmText?: string;
  cancelText?: string;

  loading?: boolean;
}

export default function ConfirmationDialog({
  open,
  onClose,
  onConfirm,

  title = "Are you sure?",
  message = "This action cannot be undone.",

  confirmText = "Delete",
  cancelText = "Cancel",

  loading = false,
}: ConfirmationDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      size="sm"
    >
      <p className="text-sm leading-6 text-gray-600">
        {message}
      </p>

      <div className="mt-6 flex justify-end gap-3">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          {cancelText}
        </Button>

        <Button
          variant="danger"
          onClick={onConfirm}
          loading={loading}
        >
          {confirmText}
        </Button>
      </div>
    </Modal>
  );
}