"use client";

import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchForms,
  deleteForm,
} from "../../features/forms/formThunks";

import {
  Button,
  LoadingState,
  EmptyState,
  ConfirmationDialog,
} from "../ui";

export default function FormsList() {

  const router = useRouter();

  const dispatch =
    useAppDispatch();

  const {
    items,
    loading,
    error,
  } = useAppSelector(
    state => state.forms
  );

  const [
    deleteId,
    setDeleteId,
  ] = useState<string | null>(
    null
  );

  useEffect(() => {

    dispatch(fetchForms());

  }, [dispatch]);

  const handleDelete = async () => {

    if (!deleteId) {
      return;
    }

    await dispatch(
      deleteForm(deleteId)
    );

    setDeleteId(null);
  };

  if (
    loading &&
    items.length === 0
  ) {
    return (
      <LoadingState
        message="Loading forms..."
      />
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex justify-between">

        <div>
          <h1 className="text-2xl font-semibold">
            Forms
          </h1>

          <p className="text-sm text-gray-500">
            Create and manage customer forms.
          </p>
        </div>

        <Button
          onClick={() =>
            router.push(
              "/forms/new"
            )
          }
        >
          Create Form
        </Button>

      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {items.length === 0 ? (

        <EmptyState
          title="No forms"
          description="Create your first form."
          action={
            <Button
              onClick={() =>
                router.push(
                  "/forms/new"
                )
              }
            >
              Create Form
            </Button>
          }
        />

      ) : (

        <div className="grid gap-4">

          {items.map(form => (

            <div
              key={form.id}
              className="rounded-lg border bg-white p-5"
            >

              <div className="flex justify-between">

                <div>

                  <h2 className="font-semibold">
                    {form.name}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    {form.description}
                  </p>

                  <div className="mt-3 text-xs text-gray-400">
                    {form.fields.length} fields
                  </div>

                </div>

                <div className="flex gap-2">

                  <Button
                    variant="secondary"
                    onClick={() =>
                      router.push(
                        `/forms/${form.id}`
                      )
                    }
                  >
                    Responses
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() =>
                      router.push(
                        `/forms/${form.id}/edit`
                      )
                    }
                  >
                    Edit
                  </Button>

                  <Button
                    variant="danger"
                    onClick={() =>
                      setDeleteId(
                        form.id
                      )
                    }
                  >
                    Delete
                  </Button>

                </div>

              </div>

            </div>

          ))}

        </div>
      )}

      <ConfirmationDialog
        open={Boolean(deleteId)}
        title="Delete form?"
        message="Deleting this form cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={
          handleDelete
        }
        onClose={() =>
          setDeleteId(null)
        }
      />

    </div>
  );
}