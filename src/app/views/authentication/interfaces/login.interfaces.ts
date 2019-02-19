export interface LoginData {
    token: string;
    username: string;
    password: string;
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
