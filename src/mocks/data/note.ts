import { Note } from "@/src/types/note";

export const notes: Note[] = [
  {
    id: "n001",
    customerId: "c001",
    content: "Discussed project requirements and timelines.",
    createdBy: "user1",
    createdAt: "2026-09-01T10:00:00Z",
    updatedAt: "2026-09-01T12:00:00Z",
  },
  {
    id: "n002",
    customerId: "c001",
    content: "Client feedback received.",
    createdBy: "user1",
    createdAt: "2026-09-02T14:30:00Z",
    updatedAt: "2026-09-02T16:45:00Z",
  },
  {
    id: "n003",
    customerId: "c001",
    content: "Identified a critical bug in the payment processing module.",
    createdBy: "user1",
    createdAt: "2026-09-03T09:15:00Z",
    updatedAt: "2026-09-03T11:30:00Z",
  }
];