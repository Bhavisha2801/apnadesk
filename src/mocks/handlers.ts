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

    console.log("MSW: Customer created", newCustomer);

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


// Form Handlers
  http.get(
    "/api/forms",
    () => {
        return HttpResponse.json(forms);
    }
  ),

  http.get(
    "/api/forms/:id",
    ({ params }) => {
      const form = forms.find(
        form => form.id === params.id
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

      return HttpResponse.json(form);
    }
  ),

  http.get(
    "/api/forms/:id/responses",
    ({ params }) => {
      const form = forms.find(
        form => form.id === params.id
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

//   Form Responses handlers
    http.get(
        "/api/responses",
        () => {
            return HttpResponse.json(responses);
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

            return HttpResponse.json(response);
        }
    )
];