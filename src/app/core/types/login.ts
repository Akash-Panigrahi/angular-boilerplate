export interface LoginData {
    token: string;
    username: string;
}

export interface LoginResponse {
    status: number;
    data: LoginData;
    message: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}
