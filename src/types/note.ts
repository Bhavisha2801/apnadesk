export interface Note {
  id: string;
  customerId: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt?: string;
}

export interface CreateNoteInput {
  customerId: string;
  content: string;
  createdBy: string;
}

export interface UpdateNoteInput {
  content: string;
}