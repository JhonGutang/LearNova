export enum Role {
    STUDENT = "STUDENT",
    CREATOR = "CREATOR",
}

export interface credentials {
    email: string
    password: string
    role:  Role
}