export interface ILoginResponse {
    status: number;
    data: {
        token: string,
        username: string,
        password: string
    };
    message: string;
}

export interface ILoginData {
    token: string;
    username: string;
    password: string;
}
