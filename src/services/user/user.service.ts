import {IUser} from "../../common/interfaces/user.interface";
import UserModel from "../../models/user.model";

async function createUser(user: IUser)  {
    const newUser = new UserModel(user);

    try{
        return await newUser.save();
    }catch (error) {
        throw error
    }
}

const UserService = { createUser }
export default UserService;