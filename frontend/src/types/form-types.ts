
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
  
  export type FieldType = {
    key: keyof FormType;
    label: string;
    id: string;
    type: string;
    autoComplete?: string;
    required: boolean;
  };
  
  export type StepType = {
    key: string;
    title: string;
    fields: FieldType[];
  };
  