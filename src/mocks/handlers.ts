import {
  http,
  HttpResponse,
} from "msw";
import { customers } from "./data/customer";
import { forms } from "./data/forms";
import { notes } from "./data/note";
import { responses } from "./data/responses";
import { CreateCustomerInput, Customer, UpdateCustomerInput } from "../types/customer";


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
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      phone: body.phone,
      status: body.status,
      dateOfBirth: body.dateOfBirth,
      address: body.address,
      createdAt: new Date().toISOString(),
    };

    customers.push(newCustomer);

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
          message: "Customer not found",
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

//   Notes handlers
  http.get(
    "/api/notes",
    () => {
        return HttpResponse.json(notes);
    }
  ),

  http.get(
    "/api/notes/:id",
    ({ params }) => {
      const note = notes.find(
        note => note.id === params.id
      );

      if (!note) {
        return HttpResponse.json(
          {
            message: "Note not found",
          },
          {
            status: 404,
          }
        );
      }

      return HttpResponse.json(note);
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