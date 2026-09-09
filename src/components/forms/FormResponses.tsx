"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  useAppDispatch,
  useAppSelector,
} from "@/src/store/hooks";

import {
  fetchFormResponses,
} from "../../features/responses/responseThunks";

import {
  fetchForm,
} from "../../features/forms/formThunks";

import {
  fetchCustomers,
} from "../../features/customers/customerThunks";

import {
  Button,
  LoadingState,
  EmptyState,
} from "../ui";

import ResponseDetailsModal from "../forms/ResponseDetailsModal";
import { useRouter } from "next/navigation";

interface FormResponsesProps {
  formId: string;
}

export default function FormResponses({
  formId,
}: FormResponsesProps) {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    selectedForm,
  } = useAppSelector(
    (state) => state.forms
  );

  const {
    items: responses,
    loading,
    error,
  } = useAppSelector(
    (state) => state.responses
  );

  const {
    items: customers,
  } = useAppSelector(
    (state) => state.customers
  );

  const [
    selectedCustomerId,
    setSelectedCustomerId,
  ] = useState<string | null>(null);

  const [
    selectedResponseId,
    setSelectedResponseId,
  ] = useState<string | null>(null);

  /*
   * Load form, responses and customers
   */
  useEffect(() => {
    dispatch(fetchForm(formId));

    dispatch(fetchFormResponses(formId));

    dispatch(fetchCustomers());
  }, [
    dispatch,
    formId,
  ]);

  /*
   * Get unique customers who submitted this form
   */
  const customerIds = useMemo(() => {
    return Array.from(
      new Set(
        responses.map(
          (response) =>
            response.customerId
        )
      )
    );
  }, [responses]);

  /*
   * Convert customerId -> customer object
   */
  const responseCustomers = useMemo(() => {
    return customerIds
      .map((customerId) =>
        customers.find(
          (customer) =>
            customer.id === customerId
        )
      )
      .filter(
        (
          customer
        ): customer is NonNullable<
          typeof customer
        > => Boolean(customer)
      );
  }, [
    customerIds,
    customers,
  ]);

  /*
   * Get selected customer
   */
  const selectedCustomer = useMemo(() => {
    if (!selectedCustomerId) {
      return null;
    }

    return (
      customers.find(
        (customer) =>
          customer.id ===
          selectedCustomerId
      ) ?? null
    );
  }, [
    customers,
    selectedCustomerId,
  ]);

  /*
   * Get all submissions
   * for selected customer
   */
  const customerResponses = useMemo(() => {
    if (!selectedCustomerId) {
      return [];
    }

    return responses
      .filter(
        (response) =>
          response.customerId ===
          selectedCustomerId
      )
      .sort(
        (a, b) =>
          new Date(
            b.submittedAt
          ).getTime() -
          new Date(
            a.submittedAt
          ).getTime()
      );
  }, [
    responses,
    selectedCustomerId,
  ]);

  if (
    loading &&
    responses.length === 0
  ) {
    return (
      <LoadingState
        message="Loading responses..."
      />
    );
  }

  return (
    <div className="space-y-6 p-6">

        <div>
        <Button
            variant="outline"
            onClick={() => router.push("/forms")}
        >
            ← Back to Forms
        </Button>
    </div>

      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold">
          {selectedForm?.name ??
            "Form Responses"}
        </h1>

        <p className="text-sm text-gray-500">
          View customer submissions for this form.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-md bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* No responses */}

      {customerIds.length === 0 ? (
        <EmptyState
          title="No responses"
          description="No customers have submitted this form yet."
        />
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">

          {/* CUSTOMERS */}

          <div className="rounded-xl border border-gray-200 bg-white p-4">

            <h2 className="font-semibold text-gray-900">
              Customers
            </h2>

            <div className="mt-4 space-y-2">

              {responseCustomers.map(
                (customer) => {

                  const isSelected =
                    selectedCustomerId ===
                    customer.id;

                  return (
                    <button
                      key={customer.id}
                      type="button"
                      onClick={() =>
                        setSelectedCustomerId(
                          customer.id
                        )
                      }
                      className={`w-full rounded-lg p-3 text-left text-sm transition ${
                        isSelected
                          ? "bg-gray-100 font-medium text-gray-900"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {customer.firstName}{" "}
                      {customer.lastName}
                    </button>
                  );
                }
              )}

            </div>

          </div>

          {/* SUBMISSION HISTORY */}

          <div className="rounded-xl border border-gray-200 bg-white p-5">

            {!selectedCustomerId ? (

              <div className="py-12 text-center text-sm text-gray-500">
                Select a customer to
                view submissions.
              </div>

            ) : (

              <>

                {/* Selected customer */}

                <div className="mb-5">

                  <h2 className="text-lg font-semibold text-gray-900">
                    {selectedCustomer?.firstName}{" "}
                    {selectedCustomer?.lastName}
                  </h2>

                  {selectedCustomer?.email && (
                    <p className="mt-1 text-sm text-gray-500">
                      {selectedCustomer.email}
                    </p>
                  )}

                </div>

                <h3 className="font-semibold text-gray-900">
                  Submission History
                </h3>

                <div className="mt-4 space-y-3">

                  {customerResponses.map(
                    (response) => (

                      <div
                        key={response.id}
                        className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 sm:flex-row sm:items-center sm:justify-between"
                      >

                        <div>

                          <div className="font-medium text-gray-900">
                            {new Date(
                              response.submittedAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                          </div>

                          <div className="text-xs text-gray-500">
                            {new Date(
                              response.submittedAt
                            ).toLocaleTimeString(
                              "en-IN",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </div>

                        </div>

                        <Button
                          variant="secondary"
                          onClick={() =>
                            setSelectedResponseId(
                              response.id
                            )
                          }
                        >
                          View Response
                        </Button>

                      </div>

                    )
                  )}

                </div>

              </>
            )}

          </div>

        </div>
      )}

      {/* Response details */}

      <ResponseDetailsModal
        responseId={
          selectedResponseId
        }
        form={selectedForm}
        customer={selectedCustomer}
        onClose={() =>
          setSelectedResponseId(
            null
          )
        }
      />

    </div>
  );
}