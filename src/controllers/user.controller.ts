import {Router, Request, Response, RequestHandler} from "express";
import {IUser} from "../common/interfaces/user.interface";

const UserController = () => {
    return {
        me: async(req: Request, res: Response): Promise<any> => {
            return res.json({
                id: 1,
                name: 'Test',
                email: 'email@email.com',
                token: 'token',
            })
        }
    }
};



export default UserController;