import {ITransaction} from "../../common/interfaces/transaction.interface";
import TransactionRepository from "../../repositories/transaction.repository";

async function getTransactionListByEmail(user_id: string): Promise<ITransaction[]|null> {
    return await TransactionRepository.getListTransaction(user_id);
}

async function create(user_id: string, amount: string): Promise<ITransaction>{
    return await TransactionRepository.create(user_id, amount);
}

async function updateByIdAndUserId(id: string, user_id: string, amount: string): Promise<void>{
    await TransactionRepository.updateByIdAndUserId(id, user_id, amount);
}

const TransactionService = {
    getTransactionListByEmail,
    create,
    updateByIdAndUserId
};

export default TransactionService;