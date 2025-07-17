import {IUser, IUserLogin} from "../common/interfaces/user.interface";
import UserModel from "../models/user.model";
import {LoginDTO} from "../common/dto/user.dto";
import bcrypt from "bcrypt"

async function login(email: string, passwordHash: string) {

    return await UserModel.findOne({email, password: passwordHash}) || undefined;
}

async function getUserByEmail(email: string): Promise<IUser|null> {
    return UserModel.findOne({email})
}

async function updateUserToken(user_id: string, token: string): Promise<void> {
    await UserModel.findOneAndUpdate({user_id}, {token});
}


const UserRepository = { login, getUserByEmail, updateUserToken }

export default UserRepository;