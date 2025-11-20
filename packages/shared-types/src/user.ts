import { Role } from './enums';

// User credentials
export interface Credentials {
  email: string;
  password: string;
  role: Role;
}

// Student creation input
export interface StudentCreateInput {
  address: string;
  email: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  password: string;
  phone: string;
}

// Student interface
export interface Student {
  id?: string;
  firstName: string;
  lastName: string;
  level?: number;
  exp?: number;
}

// Base response structure
export interface BaseResponse {
  login?: {
    status: "SUCCESS" | "ERROR";
    message: string;
  };
  createStudent?: {
    status: "SUCCESS" | "ERROR";
    message: string;
  };
  logout?: {
    status: "SUCCESS" | "ERROR";
    message: string;
  };
}

// Error interface
export interface Error {
  message: string;
}

