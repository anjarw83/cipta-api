import mongoose, {Schema} from "mongoose";
import {ITransaction} from "../common/interfaces/transaction.interface";

const TransactionSchema = new Schema<ITransaction>({
    user_id: {type: String, required: true},
    amount: {type: String, required: true},
    created_at: {type: Date, required: true},
    updated_at: {type: Date, required: true}
}, {
    toJSON: {
        transform: (doc, ret) => {
            const {_id, __v, ...rest} = ret;
            return {
                id: _id,
                ...rest
            }
        }
    },
    versionKey: false
});

const TransactionModel = mongoose.model('Transaction', TransactionSchema);

export default TransactionModel;