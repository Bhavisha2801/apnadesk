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
  fetchForms,
} from "../../features/forms/formThunks";

import {
  fetchCustomerFormResponses,
} from "../../features/responses/responseThunks";

import {
  Button,
  LoadingState,
  EmptyState,
  Modal,
} from "../ui";


import ResponseDetailsModal from "../forms/ResponseDetailsModal";

import type {
  FormSchema,
} from "@/src/types/form";
import CustomerFormResponse from "../forms/CustomerFormResponse";
import { customers } from "@/src/mocks/data/customer";

interface CustomerFormsProps {
  customerId: string;
}

export default function CustomerForms({
  customerId,
}: CustomerFormsProps) {

  const dispatch = useAppDispatch();

  // --------------------------------------------------
  // FORMS
  // --------------------------------------------------

  const {
    items: forms,
    loading: formsLoading,
  } = useAppSelector(
    state => state.forms
  );

  // --------------------------------------------------
  // RESPONSES
  // --------------------------------------------------

  const {
    items: responses,
    loading: responsesLoading,
    error: responsesError,
  } = useAppSelector(
    state => state.responses
  );

  // --------------------------------------------------
  // FILL FORM
  // --------------------------------------------------

  const [
    selectedForm,
    setSelectedForm,
  ] = useState<FormSchema | null>(
    null
  );

  const [
    showFillForm,
    setShowFillForm,
  ] = useState(false);

  // --------------------------------------------------
  // RESPONSES MODAL
  // --------------------------------------------------

  const [
    showResponses,
    setShowResponses,
  ] = useState(false);

  const [
    selectedResponseId,
    setSelectedResponseId,
  ] = useState<string | null>(
    null
  );

  // --------------------------------------------------
  // LOAD DATA
  // --------------------------------------------------

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

  // --------------------------------------------------
  // CUSTOMER RESPONSES
  // --------------------------------------------------

  const customerResponses =
    useMemo(() => {

      return responses.filter(
        response =>
          response.customerId ===
          customerId
      );

    }, [
      responses,
      customerId,
    ]);

  // --------------------------------------------------
  // RESPONSE COUNT
  // --------------------------------------------------

  const getFormResponseCount = (
    formId: string
  ) => {

    return customerResponses.filter(
      response =>
        response.formId ===
        formId
    ).length;

  };

  // --------------------------------------------------
  // SELECTED FORM RESPONSES
  // --------------------------------------------------

  const selectedFormResponses =
    useMemo(() => {

      if (!selectedForm) {
        return [];
      }

      return customerResponses
        .filter(
          response =>
            response.formId ===
            selectedForm.id
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
      customerResponses,
      selectedForm,
    ]);

    const selectedCustomer = useMemo(() => {
      return (
        customers.find(
          customer => customer.id === customerId
        ) ?? null
      );
    }, [
      customers,
      customerId,
    ]);

  // --------------------------------------------------
  // FILL FORM
  // --------------------------------------------------

  const handleFillForm = (
    form: FormSchema
  ) => {

    setSelectedForm(form);

    setShowFillForm(true);

  };

  // --------------------------------------------------
  // FORM SUBMISSION SUCCESS
  // --------------------------------------------------

  const handleFormSuccess = async () => {

    // Refresh customer's responses
    await dispatch(
      fetchCustomerFormResponses(
        customerId
      )
    );

    // Close fill form modal
    setShowFillForm(false);

    // Clear selected form
    setSelectedForm(null);

  };

  // --------------------------------------------------
  // CANCEL FORM
  // --------------------------------------------------

  const handleCancelForm = () => {

    setShowFillForm(false);

    setSelectedForm(null);

  };

  // --------------------------------------------------
  // VIEW RESPONSES
  // --------------------------------------------------

  const handleViewResponses = (
    form: FormSchema
  ) => {

    setSelectedForm(form);

    setShowResponses(true);

  };

  // --------------------------------------------------
  // CLOSE RESPONSES
  // --------------------------------------------------

  const handleCloseResponses = () => {

    setShowResponses(false);

    setSelectedForm(null);

  };

  // --------------------------------------------------
  // VIEW INDIVIDUAL RESPONSE
  // --------------------------------------------------

  const handleViewResponse = (
    responseId: string
  ) => {

    setSelectedResponseId(
      responseId
    );

  };

  // --------------------------------------------------
  // CLOSE INDIVIDUAL RESPONSE
  // --------------------------------------------------

  const handleCloseResponseDetails = () => {

    setSelectedResponseId(
      null
    );

  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (formsLoading) {

    return (
      <LoadingState
        message="Loading forms..."
      />
    );

  }

  // --------------------------------------------------
  // NO FORMS
  // --------------------------------------------------

  if (forms.length === 0) {

    return (
      <EmptyState
        title="No forms"
        description="No forms are available for this customer."
      />
    );

  }

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <>
      <div className="space-y-6">

        {/* HEADER */}

        <div>

          <h2 className="text-xl font-semibold">
            Forms
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Select a form to submit a response
            or view this customer's submissions.
          </p>

        </div>


        {/* FORM LIST */}

        <div className="space-y-4">

          {forms.map(
            form => {

              const responseCount =
                getFormResponseCount(
                  form.id
                );

              return (

                <div
                  key={form.id}
                  className="rounded-xl border border-gray-200 bg-white p-5"
                >

                  <div className="flex items-start justify-between gap-4">

                    {/* FORM INFO */}

                    <div>

                      <h3 className="text-base font-semibold text-gray-900">
                        {form.name}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {form.description}
                      </p>

                      <p className="mt-3 text-sm text-gray-500">
                        {responseCount}{" "}
                        {responseCount === 1
                          ? "response"
                          : "responses"}
                      </p>

                    </div>


                    {/* ACTIONS */}

                    <div className="flex shrink-0 gap-2">

                      {/* FILL FORM */}

                      <Button
                        variant="primary"
                        onClick={() =>
                          handleFillForm(
                            form
                          )
                        }
                      >
                        Fill Form
                      </Button>


                      {/* RESPONSES */}

                      <Button
                        variant="secondary"
                        onClick={() =>
                          handleViewResponses(
                            form
                          )
                        }
                      >
                        Responses
                      </Button>

                    </div>

                  </div>

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* ================================================= */}
      {/* FILL FORM MODAL */}
      {/* ================================================= */}

      <Modal
        open={
          showFillForm &&
          Boolean(selectedForm)
        }
        onClose={
          handleCancelForm
        }
        title={
          selectedForm
            ? `Fill ${selectedForm.name}`
            : "Fill Form"
        }
        size="lg"
      >

        {selectedForm && (

          <CustomerFormResponse
            form={selectedForm}
            customerId={customerId}
            onSuccess={
              handleFormSuccess
            }
            onCancel={
              handleCancelForm
            }
          />

        )}

      </Modal>


      {/* ================================================= */}
      {/* SELECTED FORM RESPONSES MODAL */}
      {/* ================================================= */}

      <Modal
        open={
          showResponses &&
          Boolean(selectedForm)
        }
        onClose={
          handleCloseResponses
        }
        title={
          selectedForm
            ? `${selectedForm.name} Responses`
            : "Form Responses"
        }
        size="lg"
      >

        {responsesLoading ? (

          <LoadingState
            message="Loading responses..."
          />

        ) : responsesError ? (

          <div className="rounded-md bg-red-50 p-4 text-sm text-red-600">
            {responsesError}
          </div>

        ) : selectedFormResponses.length === 0 ? (

          <div className="py-10 text-center text-sm text-gray-500">
            This customer has not submitted
            this form yet.
          </div>

        ) : (

          <div className="space-y-3">

            {selectedFormResponses.map(
              response => (

                <div
                  key={response.id}
                  className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
                >

                  <div>

                    <div className="text-sm font-medium text-gray-900">
                      Submitted
                    </div>

                    <div className="mt-1 text-sm text-gray-500">
                      {formatDate(
                        response.submittedAt
                      )}
                    </div>

                    <div className="mt-1 text-xs text-gray-400">
                      {response.answers.length}{" "}
                      answers
                    </div>

                  </div>

                  <Button
                    variant="secondary"
                    onClick={() =>
                      handleViewResponse(
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

        )}

      </Modal>


      {/* ================================================= */}
      {/* INDIVIDUAL RESPONSE DETAILS */}
      {/* ================================================= */}

      <ResponseDetailsModal
        responseId={
          selectedResponseId
        }
        form={
          selectedForm
        }
        customer={
          selectedCustomer
        }
        onClose={
          handleCloseResponseDetails
        }
      />

    </>
  );
}


/* ===================================================== */
/* HELPERS */
/* ===================================================== */

function formatDate(
  date: string
): string {

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