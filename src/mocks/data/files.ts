import type {
  CustomerFile,
} from "../../types/files";

export const files: CustomerFile[] = [
  {
    id: "file-001",
    customerId: "c001",
    name: "Bhavisha_Profile.pdf",
    type: "pdf",
    mimeType: "application/pdf",
    size: 245760,
    url: "/files/Bhavisha_Profile.pdf",
    uploadedAt: "2026-09-08T10:30:00Z",
    uploadedBy: "Admin",
  },

  {
    id: "file-002",
    customerId: "c001",
    name: "Bhavisha_Profile_Photo.jpg",
    type: "image",
    mimeType: "image/jpeg",
    size: 524288,
    url: "/files/Bhavisha_Profile_Photo.jpg",
    uploadedAt: "2026-09-07T14:20:00Z",
    uploadedBy: "Admin",
  },

  {
    id: "file-003",
    customerId: "c001",
    name: "Customer_Agreement.pdf",
    type: "pdf",
    mimeType: "application/pdf",
    size: 786432,
    url: "/files/Customer_Agreement.pdf",
    uploadedAt: "2026-09-05T11:15:00Z",
    uploadedBy: "Admin",
  },

  {
    id: "file-004",
    customerId: "c002",
    name: "Rahul_Document.pdf",
    type: "pdf",
    mimeType: "application/pdf",
    size: 356352,
    url: "/files/Rahul_Document.pdf",
    uploadedAt: "2026-09-04T09:45:00Z",
    uploadedBy: "Admin",
  },

  {
    id: "file-005",
    customerId: "c003",
    name: "Priya_Invoice.pdf",
    type: "pdf",
    mimeType: "application/pdf",
    size: 196608,
    url: "/files/Priya_Invoice.pdf",
    uploadedAt: "2026-09-03T16:30:00Z",
    uploadedBy: "Admin",
  },
];