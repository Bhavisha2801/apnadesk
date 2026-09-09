export interface FormResponse {
  id: string;
  formId: string;
  customerId: string;
  submittedAt: string;

  answers: Record<string, unknown>;
}