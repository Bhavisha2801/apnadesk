"use client";

import { useRouter } from "next/navigation";

import FormBuilder from "@/src/components/forms/FormBuilder";

import {
  useAppDispatch,
} from "@/src/store/hooks";

import {
  createForm,
} from "../../../features/forms/formThunks";
import { CreateFormInput } from "@/src/types/form";

export default function NewFormPage() {

  const router = useRouter();

  const dispatch =
    useAppDispatch();

  const handleSubmit =
    async (data: CreateFormInput) => {

      const result =
        await dispatch(
          createForm({
            ...data
          })
        );

      if (
        createForm.fulfilled.match(
          result
        )
      ) {
        router.push("/forms");
      }
    };

  return (
    <main className="p-6">

      <div className="mb-6">
        <h1 className="text-2xl font-semibold">
          Create Form
        </h1>

        <p className="text-sm text-gray-500">
          Build a custom form for your customers.
        </p>
      </div>

      <FormBuilder
        onSubmit={
          handleSubmit
        }
      />

    </main>
  );
}