export interface IUser {
    _id?: string;
    id?: string;
    name: string;
    email: string;
    password?: string;
    token?: string;
}

export interface IUserLogin {
    email: string;
    password: string;
}

