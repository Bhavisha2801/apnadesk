import {
  http,
  HttpResponse,
} from "msw";
import { customers } from "./data/customer";
import { forms } from "./data/forms";
import { notes } from "./data/note";
import { responses } from "./data/responses";
import { CreateCustomerInput, Customer, UpdateCustomerInput } from "../types/customer";
import { CreateNoteInput, Note } from "../types/note";
import { CreateFormInput } from "../types/form";
import { FormResponse } from "../types/response";


export const handlers = [

// Customer Handlers
  http.get(
    "/api/customers",
    () => {
      return HttpResponse.json(customers);
    }
  ),

  http.get(
    "/api/customers/:id",
    ({ params }) => {

      const customer = customers.find(
        customer => customer.id === params.id
      );

      if (!customer) {
        return HttpResponse.json(
          {
            message: "Customer not found",
          },
          {
            status: 404,
          }
        );
      }

      return HttpResponse.json(customer);
    }
  ),

  // POST /api/customers
  http.post("/api/customers", async ({ request }) => {
    const body = (await request.json()) as CreateCustomerInput;

    const newCustomer: Customer = {
      id: `customer-${Date.now()}`,
      ...body,
      createdAt: new Date().toISOString(),
    };

    customers.unshift(newCustomer);

    return HttpResponse.json(newCustomer, {
      status: 201,
    });
  }),

  http.put(
    "/api/customers/:id",
    async ({ params, request }) => {
      const index = customers.findIndex(
        (customer) => customer.id === params.id
      );

      if (index === -1) {
        return HttpResponse.json(
          {
            message: "Customer not found",
          },
          {
            status: 404,
          }
        );
      }

      const body =
        (await request.json()) as UpdateCustomerInput;

      const updatedCustomer: Customer = {
        ...customers[index],
        ...body,
      };

      customers[index] = updatedCustomer;

      return HttpResponse.json(updatedCustomer);
    }
  ),

  // DELETE /api/customers/:id
  http.delete("/api/customers/:id", ({ params }) => {
    const index = customers.findIndex(
      (customer) => customer.id === params.id
    );

    if (index === -1) {
      return HttpResponse.json(
        {
          message: "Customer not found.",
        },
        {
          status: 404,
        }
      );
    }

    customers.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),

  // Form → all submitted responses
  
  // Form Responses handlers
  http.get(
    "/api/forms/:id/responses",
    ({ params }) => {
      const formId = params.id as string;

      // Check if form exists
      const form = forms.find(
        form => form.id === formId
      );

      if (!form) {
        return HttpResponse.json(
          {
            message: "Form not found",
          },
          {
            status: 404,
          }
        );
      }

      // Get responses for this form
      const formResponses =
        responses.filter(
          response =>
            response.formId === formId
        );

      return HttpResponse.json(
        formResponses,
        {
          status: 200,
        }
      );
    }
  ),

// Form Handlers
  http.get(
    "/api/forms",
    () => {
        return HttpResponse.json(forms);
    }
  ),

  // GET FORM BY ID
  http.get(
    "/api/forms/:id",
    ({ params }) => {
      const formId = params.id as string;

      const form = forms.find(
        form => form.id === formId
      );

      if (!form) {
        return HttpResponse.json(
          {
            message: "Form not found",
          },
          {
            status: 404,
          }
        );
      }

      return HttpResponse.json(
        form,
        {
          status: 200,
        }
      );
    }
  ),

  http.post(
    "/api/forms",
    async ({
      request,
    }) => {

      const body =
        (await request.json()) as CreateFormInput;

      const now =
        new Date().toISOString();

      const newForm = {
        id: `form-${Date.now()}`,
        ...body,
        createdAt: now,
        updatedAt: now,
      };

      forms.unshift(newForm);

      return HttpResponse.json(
        newForm,
        {
          status: 201,
        }
      );
    }
  ),

  http.put(
    "/api/forms/:id",
    async ({
      params,
      request,
    }) => {

      const index =
        forms.findIndex(
          form =>
            form.id ===
            params.id
        );

      if (index === -1) {
        return HttpResponse.json(
          {
            message:
              "Form not found.",
          },
          {
            status: 404,
          }
        );
      }

      const body =
        (await request.json()) as CreateFormInput;

      const updatedForm = {
        ...forms[index],
        ...body,
        updatedAt:
          new Date().toISOString(),
      };

      forms[index] =
        updatedForm;

      return HttpResponse.json(
        updatedForm,
        {
          status: 200,
        }
      );
    }
  ),

  http.delete(
    "/api/forms/:id",
    ({ params }) => {

      const index =
        forms.findIndex(
          form =>
            form.id ===
            params.id
        );

      if (index === -1) {
        return HttpResponse.json(
          {
            message:
              "Form not found.",
          },
          {
            status: 404,
          }
        );
      }

      forms.splice(index, 1);

      return new HttpResponse(
        null,
        {
          status: 204,
        }
      );
    }
  ),

// ===============================
// NOTES HANDLERS
// ===============================

// GET CUSTOMER NOTES
http.get(
  "/api/customers/:customerId/notes",
  ({ params }) => {
    const customerId =
      params.customerId as string;

    const customerNotes = notes.filter(
      (note) =>
        note.customerId === customerId
    );

    return HttpResponse.json(
      customerNotes
    );
  }
),

// GET SINGLE NOTE
http.get(
  "/api/notes/:noteId",
  ({ params }) => {
    const noteId =
      params.noteId as string;

    const note = notes.find(
      (note) =>
        note.id === noteId
    );

    if (!note) {
      return HttpResponse.json(
        {
          message: "Note not found.",
        },
        {
          status: 404,
        }
      );
    }

    return HttpResponse.json(note);
  }
),

// CREATE NOTE
http.post(
  "/api/customers/:customerId/notes",
  async ({
    params,
    request,
  }) => {
    const customerId =
      params.customerId as string;

    const body =
      (await request.json()) as CreateNoteInput;

    const newNote: Note = {
      id: `note-${Date.now()}`,
      customerId,
      content: body.content,
      createdBy: body.createdBy,
      createdAt:
        new Date().toISOString(),
      updatedAt:
        new Date().toISOString(),
    };

    notes.unshift(newNote);

    return HttpResponse.json(
      newNote,
      {
        status: 201,
      }
    );
  }
),

// UPDATE NOTE
http.put(
  "/api/notes/:noteId",
  async ({
    params,
    request,
  }) => {
    const noteId =
      params.noteId as string;

    const index =
      notes.findIndex(
        (note) =>
          note.id === noteId
      );

    if (index === -1) {
      return HttpResponse.json(
        {
          message: "Note not found.",
        },
        {
          status: 404,
        }
      );
    }

    const body =
      (await request.json()) as Pick<
        Note,
        "content"
      >;

    const updatedNote: Note = {
      ...notes[index],
      content: body.content,
      updatedAt:
        new Date().toISOString(),
    };

    notes[index] =
      updatedNote;

    return HttpResponse.json(
      updatedNote
    );
  }
),

// DELETE NOTE
http.delete(
  "/api/notes/:noteId",
  ({ params }) => {
    const noteId =
      params.noteId as string;

    const index =
      notes.findIndex(
        (note) =>
          note.id === noteId
      );

    if (index === -1) {
      return HttpResponse.json(
        {
          message: "Note not found.",
        },
        {
          status: 404,
        }
      );
    }

    notes.splice(index, 1);

    return new HttpResponse(
      null,
      {
        status: 204,
      }
    );
  }
),

  // Form Responses handlers

  // Customer → all submitted forms
  http.get(
    "/api/customers/:customerId/form-responses",
    ({ params }) => {

      const formresponses =
        responses.filter(
          response =>
            response.customerId ===
            params.customerId
        );

      return HttpResponse.json(
        formresponses,
        {
          status: 200,
        }
      );
    }
  ),

    http.get(
        "/api/responses",
        () => {
            return HttpResponse.json(responses,
              {
                status: 200,
              }
            );
        }
    ),

    http.get(
        "/api/responses/:id",
        ({ params }) => {
            const response = responses.find(
                response => response.id === params.id
            );

            if (!response) {
                return HttpResponse.json(
                    {
                        message: "Response not found",
                    },
                    {
                        status: 404,
                    }
                );
            }

            return HttpResponse.json(response, {
                status: 200,
            });
        }
    ),

    // CREATE FORM RESPONSE
http.post(
  "/api/forms/:formId/responses",
  async ({ params, request }) => {
    const body =
      (await request.json()) as {
        customerId: string;
        answers: {
          fieldId: string;
          value: string | string[];
        }[];
      };

    const formId =
      params.formId as string;

    if (!body.customerId) {
      return HttpResponse.json(
        {
          message:
            "Customer ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (
      !body.answers ||
      body.answers.length === 0
    ) {
      return HttpResponse.json(
        {
          message:
            "At least one answer is required.",
        },
        {
          status: 400,
        }
      );
    }

    const newResponse: FormResponse = {
      id: `response-${Date.now()}`,
      formId,
      customerId:
        body.customerId,
      submittedAt:
        new Date().toISOString(),
      answers:
        body.answers,
    };

    responses.unshift(
      newResponse
    );

    return HttpResponse.json(
      newResponse,
      {
        status: 201,
      }
    );
  }
),
];