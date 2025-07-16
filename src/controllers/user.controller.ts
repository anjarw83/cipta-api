import {Router, Request, Response, RequestHandler} from "express";
import {IUser} from "../common/interfaces/user.interface";
import userService from "../services/user/user.service";
import {constants} from "http2";
import Validations from "../common/validations";
import {Error} from "mongoose";

async function me(req: Request, res: Response) {
    return res.json({
        id: 1,
        name: 'Test',
        email: 'email@email.com',
        token: 'token',
    })
}

async function login(req: Request, res: Response) {
    return res.json({
        success: true,
        token: 'abc'
    })
}

async function register(req: Request, res: Response) {
    try{
        const message = "Successfully Registered";
        const { name, email, password } = req.body;
        const validation = Validations.validateRegistration(name, email,password);
        if (!validation.success) {
            return res.status(400).json({
                success: false,
                message: validation.message
            })
        }
        const user = await userService.createUser({name, email, password})
        return res.status(201).json({
            success: true,
            message: message,
            data: user
        })
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Registration Failed'
        })
    }

}

const UserController = () => {
    return { me, login, register }
};


export default UserController;