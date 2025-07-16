import {IUser} from "../../common/interfaces/user.interface";
import UserModel from "../../models/user.model";
import UserRepository from "../../repositories/user.repository";
import {LoginDTO} from "../../common/dto/user.dto";
import bcrypt from "bcrypt";
import userRepository from "../../repositories/user.repository";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'c8e3d6f4a1b2e9h7k5m8n3p6r9t2w4y7';
/**
 * Login User. Validate
 * @param loginDTO
 */
async function login(loginDTO: LoginDTO): Promise<{ success: boolean, message?: string, token?: string }> {
    console.log('SECRET', TOKEN_SECRET);
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
            isValidPassword = await bcrypt.compare(loginDTO.password, user.password);
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
        accessToken = jwt.sign(payload, TOKEN_SECRET, { expiresIn: '1h'});
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
    return userRepository.getUserByEmail(email);
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