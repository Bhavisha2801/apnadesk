export type FileType =
  | "image"
  | "pdf"
  | "video"
  | "document"
  | "other";

export interface CustomerFile {
  id: string;
  customerId: string;
  name: string;
  url: string;
  type: FileType;
  mimeType: string;
  size: number;
  uploadedAt: string;
  uploadedBy?: string;
}

export interface CreateFileInput {
  customerId: string;
  file: File;
  uploadedBy: string;
}

export interface UpdateFileInput {
  file?: File;
  uploadedBy?: string;
}