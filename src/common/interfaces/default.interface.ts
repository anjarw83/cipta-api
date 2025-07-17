import { Request } from "express";

export interface IDefaultRequest extends Request {
    user_id?: string
}