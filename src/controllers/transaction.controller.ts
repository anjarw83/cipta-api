import { Request, Response } from 'express';
import {ITransaction} from "../common/interfaces/transaction.interface";
import TransactionService from "../services/transaction/transaction.service";
import {IDefaultRequest} from "../common/interfaces/default.interface";

async function getTransaction(req: IDefaultRequest, res: Response, next: Function) {
    const user_id = req?.user_id || 'user_id';
    const result = await TransactionService.getTransactionListByEmail(user_id)
    return res.status(200).json({
        status: true,
        message: 'Data Found',
        data: result
    });
}

async function createOrUpdate(req: IDefaultRequest, res: Response, next: Function) {
    const { amount } = req.body;
    const id = req.query?.id;
    const { user_id } = req;
    let result;
    if(!user_id){
        return res.status(401).json({
            status: false,
            message: 'Invalid UserId'
        });
    }
    if(!id ){
        result = await TransactionService.create(user_id, amount);
    }else {
        result = await TransactionService.updateByIdAndUserId(id as string, user_id, amount);
    }
    return res.status(201).json({
        status: true,
        message: 'Data Created',
        data: result
    })
}

const TransactionController = () => {
    return { getTransaction, createOrUpdate }
}

export default TransactionController;