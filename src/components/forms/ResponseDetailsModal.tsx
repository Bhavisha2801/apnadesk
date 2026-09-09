"use client";

import {
  useEffect,
  useMemo,
} from "react";

import {
  Modal,
  LoadingState,
  ErrorState,
} from "../ui";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchFormResponse,
} from "../../features/responses/responseThunks";

import type {
  FormSchema as Form,
} from "@/src/types/form";

import type {
  Customer,
} from "@/src/types/customer";

interface Props {
  responseId: string | null;

  form: Form | null;

  customer: Customer | null;

  onClose: () => void;
}

export default function ResponseDetailsModal({
  responseId,
  form,
  customer,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();

  const {
    items: responses,
    selectedResponse,
    loading,
    error,
  } = useAppSelector(
    (state) => state.responses
  );

  /*
   * Get selected response.
   *
   * First use selectedResponse.
   * If Redux has not populated selectedResponse,
   * find it from responses.
   */
  const response = useMemo(() => {
    if (!responseId) {
      return null;
    }

    return (
      selectedResponse?.id === responseId
        ? selectedResponse
        : responses.find(
            (item) =>
              item.id === responseId
          ) ?? null
    );
  }, [
    responseId,
    selectedResponse,
    responses,
  ]);

  /*
   * Fetch response when modal opens
   */
  useEffect(() => {
    if (!responseId) {
      return;
    }

    dispatch(
      fetchFormResponse(
        responseId
      )
    );
  }, [
    dispatch,
    responseId,
  ]);

  if (!responseId) {
    return null;
  }

  return (
    <Modal
      open={Boolean(responseId)}
      onClose={onClose}
      title="Form Response"
      size="lg"
    >

      {/* Loading */}

      {loading && !response ? (

        <LoadingState
          message="Loading response..."
        />

      ) : error && !response ? (

        <ErrorState
          title="Unable to load response"
          message={error}
        />

      ) : !response ? (

        <div className="py-8 text-center text-sm text-gray-500">
          Response not found.
        </div>

      ) : (

        <div className="space-y-5">

          {/* Customer */}

          <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">

            <div className="text-xs font-medium uppercase tracking-wide text-gray-500">
              Customer
            </div>

            <div className="mt-1 text-base font-semibold text-gray-900">
              {customer
                ? `${customer.firstName} ${customer.lastName}`
                : "Unknown Customer"}
            </div>

            {customer?.email && (
              <div className="mt-1 text-sm text-gray-500">
                {customer.email}
              </div>
            )}

          </div>

          {/* Submitted */}

          <div className="rounded-lg bg-gray-50 p-4 text-sm">

            <div className="font-medium text-gray-700">
              Submitted
            </div>

            <div className="mt-1 text-gray-600">
              {formatDate(
                response.submittedAt
              )}
            </div>

          </div>

          {/* Answers */}

          <div className="space-y-4">

            <h3 className="text-sm font-semibold text-gray-900">
              Responses
            </h3>

            {response.answers.length ===
            0 ? (

              <div className="rounded-md border border-gray-200 p-4 text-sm text-gray-500">
                No answers submitted.
              </div>

            ) : (

              response.answers.map(
                (answer, index) => {

                  /*
                   * Match response answer
                   * with the original form
                   * schema field.
                   */
                  const field =
                    form?.fields.find(
                      (item) =>
                        item.id ===
                        answer.fieldId
                    ) ??
                    form?.fields[index];

                  const label =
                    field?.label ??
                    answer.fieldId;

                  return (
                    <div
                      key={`${answer.fieldId}-${index}`}
                      className="border-b border-gray-200 pb-4 last:border-b-0"
                    >

                      <div className="text-sm font-medium text-gray-900">
                        {label}
                      </div>

                      <div className="mt-1 whitespace-pre-wrap text-sm text-gray-600">
                        {formatAnswerValue(
                          answer.value
                        )}
                      </div>

                    </div>
                  );
                }
              )

            )}

          </div>

        </div>
      )}

    </Modal>
  );
}

/*
 * Format response value
 */
function formatAnswerValue(
  value: unknown
): string {

  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "-";
  }

  if (Array.isArray(value)) {
    return value.join(", ");
  }

  if (
    typeof value === "object"
  ) {
    return JSON.stringify(value);
  }

  return String(value);
}

/*
 * Format submitted date
 */
function formatDate(
  date: string
): string {

  if (!date) {
    return "-";
  }

  const parsedDate =
    new Date(date);

  if (
    Number.isNaN(
      parsedDate.getTime()
    )
  ) {
    return date;
  }

  return parsedDate.toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
  );
}