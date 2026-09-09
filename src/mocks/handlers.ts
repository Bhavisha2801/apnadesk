import {
  http,
  HttpResponse,
} from "msw";
import { customers } from "./data/customer";
import { forms } from "./data/forms";
import { notes } from "./data/note";
import { responses } from "./data/responses";


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