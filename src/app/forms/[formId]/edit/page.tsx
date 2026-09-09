"use client";

import {
  useEffect,
} from "react";

import {
  useParams,
  useRouter,
} from "next/navigation";

import FormBuilder
  from "@/src/components/forms/FormBuilder";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchForm,
  updateForm,
} from "../../../../features/forms/formThunks";

import type {
  CreateFormInput,
} from "@/src/types/form";

export default function EditFormPage() {

  const params =
    useParams<{
      formId: string;
    }>();

  const router =
    useRouter();

  const dispatch =
    useAppDispatch();

  const {
    selectedForm,
    loading,
  } = useAppSelector(
    state => state.forms
  );

  useEffect(() => {

    dispatch(
      fetchForm(
        params.formId
      )
    );

  }, [
    dispatch,
    params.formId,
  ]);

  const handleSubmit =
    async (
      data: CreateFormInput
    ) => {

      const result =
        await dispatch(
          updateForm({
            id:
              params.formId,

            data,
          })
        );

      if (
        updateForm.fulfilled.match(
          result
        )
      ) {
        router.push(
          `/forms/${params.formId}`
        );
      }
    };

  if (
    loading &&
    !selectedForm
  ) {
    return (
      <main className="p-6">
        Loading form...
      </main>
    );
  }

  if (!selectedForm) {
    return (
      <main className="p-6">
        Form not found.
      </main>
    );
  }

  return (
    <main className="p-6">

      <div className="mb-6">

        <h1 className="text-2xl font-semibold">
          Edit Form
        </h1>

      </div>

      <FormBuilder
        initialForm={
          selectedForm
        }
        onSubmit={
          handleSubmit
        }
      />

    </main>
  );
}