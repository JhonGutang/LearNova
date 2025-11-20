// Form type for user registration
export type FormType = {
  firstName: string;
  middleName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  password: string;
  confirmPassword: string;
};

// Form field configuration
export type FieldType = {
  key: keyof FormType;
  label: string;
  id: string;
  type: string;
  autoComplete?: string;
  required: boolean;
};

// Form step configuration
export type StepType = {
  key: string;
  title: string;
  fields: FieldType[];
};

