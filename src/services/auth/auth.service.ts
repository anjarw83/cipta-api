import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const TOKEN_SECRET = process.env.TOKEN_SECRET || 'c8e3d6f4a1b2e9h7k5m8n3p6r9t2w4y7';

async function verifyToken(req: Request & { user_id?: string }, res: Response, next: Function) {
    const authHeader = req.header('Authorization') as string;

    try{
        const token = authHeader?.split(' ')[1];
        if(!authHeader || !token) return res.status(401).json({
            success: false,
            message: 'Access Denied'
        });

        const decoded = jwt.verify(token, TOKEN_SECRET) as { id: string, email: string};
        if (!decoded?.id) {
            throw Error('Invalid Token');
        }
        req.user_id = decoded.id;
        return next();
    }catch (e) {
        res.status(401).json({
            success: false,
            message: 'Invalid Token'
        })
    }
}

async function validatePassword(password: string, passwordHash: string ): Promise<boolean> {
    return await bcrypt.compare(password, passwordHash);
}

async function sign(payload: object ) {
    return jwt.sign(payload, TOKEN_SECRET, {expiresIn: '1h'});
}

const AuthService = { verifyToken, validatePassword, sign };

export default AuthService;