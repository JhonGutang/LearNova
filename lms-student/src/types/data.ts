export enum Role {
    STUDENT = "STUDENT",
    CREATOR = "CREATOR",
}

export interface credentials {
    email: string
    password: string
    role:  Role
}

export interface studentCreateInput {
    address: string;
    email: string;
    first_name: string;
    last_name: string;
    middle_name?: string;
    password: string;
    phone: string;
}