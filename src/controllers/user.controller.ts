import {Router, Request, Response, RequestHandler} from "express";
import {IUser} from "../common/interfaces/user.interface";
import userService from "../services/user/user.service";
import {constants} from "http2";
import Validations from "../common/validations";
import {Error} from "mongoose";
import {LoginDTO} from "../common/dto/user.dto";
import {plainToClass} from "class-transformer";
import {validate} from "class-validator";

async function me(req: Request, res: Response) {
    return res.json({
        id: 1,
        name: 'Test',
        email: 'email@email.com',
        token: 'token',
    })
}

async function login(req: Request, res: Response) {
    const loginDto = new LoginDTO();
    Object.assign(loginDto, req.body);

    // validate
    const errors = await validate(loginDto);
    if(errors.length > 0 ){
        const errorMessages = errors.map(error => ({
            field: error.property,
            message: Object.values(error.constraints!)[0] // Ambil pesan pertama saja
        }));

        return res.status(400).json({
            success: false,
            errors: errorMessages
        })
    }
    const result = await userService.login(loginDto);
    if(!result.success){
        return res.status(400).json({
            success: false,
            message: result.message
        })
    }
    return res.status(200).json({
        success: true,
        token: result.token
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
        let user  = await userService.getUserByEmail(email);
        if(user){
            return res.status(400).json({
                success: false,
                message: 'Email Already Registered'
            })
        }
        user = await userService.createUser({name, email, password})
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