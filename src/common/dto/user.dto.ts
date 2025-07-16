import {IsEmail, IsNotEmpty, IsString} from "class-validator";
import {IUserLogin} from "../interfaces/user.interface";

export class LoginDTO implements IUserLogin{
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}