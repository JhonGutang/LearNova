export interface BaseResponse {
    login?: {
        status: "SUCCESS" | "ERROR";
        message: string;
    };
    createStudent?: {
        status: "SUCCESS" | "ERROR";
        message: string;
    };
}
