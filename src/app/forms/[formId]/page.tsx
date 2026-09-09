"use client";

import {
  useParams,
} from "next/navigation";

import FormResponses
  from "@/src/components/forms/FormResponses";

export default function FormResponsesPage() {

  const params =
    useParams<{
      formId: string;
    }>();

    console.log("params.formId", params.formId, params);

  return (
    <main className="p-6">

      <FormResponses
        formId={
          params.formId
        }
      />

    </main>
  );
}