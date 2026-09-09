"use client";

import {
  useEffect,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchCustomerFormResponses,
} from "../../features/responses/responseThunks";

import {
  fetchForms,
} from "../../features/forms/formThunks";

import {
  LoadingState,
  EmptyState,
  ErrorState,
  Button,
} from "../ui";

interface Props {
  customerId: string;
}

export default function CustomerFormResponses({
  customerId,
}: Props) {

  const dispatch =
    useAppDispatch();

  const {
    items: responses,
    loading,
    error,
  } = useAppSelector(
    state => state.responses
  );

  const {
    items: forms,
  } = useAppSelector(
    state => state.forms
  );

  useEffect(() => {

    dispatch(
      fetchForms()
    );

    dispatch(
      fetchCustomerFormResponses(
        customerId
      )
    );

  }, [
    dispatch,
    customerId,
  ]);

  if (
    loading &&
    responses.length === 0
  ) {
    return (
      <LoadingState
        message="Loading submitted forms..."
      />
    );
  }

  if (error && responses.length === 0) {
    return (
      <ErrorState
        message={error}
        action={
          <Button
            onClick={() =>
              window.location.reload()
            }
          >
            Retry
          </Button>
        }
      />
    );
  }

  if (responses.length === 0) {
    return (
      <EmptyState
        title="No submitted forms"
        description="This customer has not submitted any forms yet."
      />
    );
  }

  return (
    <div className="space-y-4">

      <div>
        <h2 className="text-lg font-semibold">
          Submitted Forms
        </h2>

        <p className="text-sm text-gray-500">
          Forms submitted by this customer.
        </p>
      </div>

      {responses.map(
        response => {

          const form =
            forms.find(
              item =>
                item.id ===
                response.formId
            );

          return (
            <div
              key={response.id}
              className="rounded-lg border bg-white p-4"
            >
              <div className="flex justify-between">

                <div>

                  <h3 className="font-medium">
                    {form?.name ??
                      response.formId}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Submitted{" "}
                    {new Date(
                      response.submittedAt
                    ).toLocaleString()}
                  </p>

                </div>

                <span className="text-sm text-gray-500">
                  {response.answers.length} answers
                </span>

              </div>
            </div>
          );
        }
      )}

    </div>
  );
}