import { apiClient } from "./apiClient";

import type {
  Note,
  CreateNoteInput,
} from "@/src/types/note";

export const noteService = {
  getCustomerNotes(customerId: string) {
    return apiClient<Note[]>(
      `/customers/${customerId}/notes`
    );
  },

  createNote(data: CreateNoteInput) {
    return apiClient<Note>(
      `/customers/${data.customerId}/notes`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
  },

  updateNote(
    noteId: string,
    data: Pick<Note, "content">
  ) {
    return apiClient<Note>(
      `/notes/${noteId}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
  },

  deleteNote(noteId: string) {
    return apiClient<void>(
      `/notes/${noteId}`,
      {
        method: "DELETE",
      }
    );
  },
};