import {IUser} from "../../common/interfaces/user.interface";
import UserModel from "../../models/user.model";
import UserRepository from "../../repositories/user.repository";
import {LoginDTO} from "../../common/dto/user.dto";
import bcrypt from "bcrypt";
import AuthService from "../auth/auth.service";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();


/**
 * Login User. Validate
 * @param loginDTO
 */
async function login(loginDTO: LoginDTO): Promise<{ success: boolean, message?: string, token?: string }> {
    try{
        // const passwordHash = await bcrypt.hash(loginDTO.password, 10);
        const user = await UserRepository.getUserByEmail(loginDTO.email) as IUser;
        if(!user){
            throw {
                status: 400,
                message: 'User Not Found'
            }
        }

        let isValidPassword, accessToken;
        if (user.password != null) {
            isValidPassword = await AuthService.validatePassword(loginDTO.password, user.password);
        }
        if (!isValidPassword){
            return {
                success: false,
                message: 'Invalid Email/Password',
            }
        }
        const payload = {
            id: user._id,
            email: user.email
        }
        accessToken = await AuthService.sign(payload);
        // save Token
        await UserRepository.updateUserToken(user._id as string, accessToken);
        return {
            success: true,
            message: 'Login Success',
            token: accessToken,
        }
    }catch (e) {
        throw e;
    }
}

async function getUserByEmail(email: string): Promise<IUser|null> {
    return UserRepository.getUserByEmail(email);
}
async function createUser(user: IUser)  {
    const password = user?.password || '123456'
    const passwordHash = await bcrypt.hash(password, 10)
    const newUser = new UserModel({...user, password: passwordHash});

    try{
        return await newUser.save();
    }catch (error) {
        throw new Error("Failed to Create User");
    }
}

const UserService = { createUser, getUserByEmail,  login}
export default UserService;