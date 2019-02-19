export interface ILoginData {
    token: string;
    username: string;
    password: string;
}

export interface ILoginResponse {
    status: number;
    data: ILoginData;
    message: string;
}

export interface ILoginRequest {
    username: string;
    password: string;
}
