import {ITransaction} from "../common/interfaces/transaction.interface";
import TransactionModel from "../models/transaction.model";

async function getListTransaction(user_id: string): Promise<ITransaction[]|null> {
    return await TransactionModel.find({user_id}) as ITransaction[];
}

async function create(user_id: string, amount: string): Promise<ITransaction>{
    return await TransactionModel.create({user_id, amount, created_at: new Date(), updated_at: new Date()});
}

async function updateByIdAndUserId(id: string, user_id: string, amount: string): Promise<ITransaction|null> {
    return await TransactionModel.findOneAndUpdate({_id: Object(id), user_id}, {amount, updated_at: new Date()}, { new: true}) as ITransaction;
}

const TransactionRepository = {
    getListTransaction, create, updateByIdAndUserId
}

export default TransactionRepository;