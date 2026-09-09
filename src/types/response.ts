export interface FormResponseAnswer {
  fieldId: string;
  value: string | string[] | boolean;
}

export interface FormResponse {
  id: string;
  formId: string;
  customerId: string;
  submittedAt: string;
  answers: FormResponseAnswer[];
}

export interface CreateFormResponseInput {
  formId: string;
  customerId: string;
  answers: FormResponseAnswer[];
}