export interface ITransaction {
    id?: string;
    _id?: string;
    user_id: string;
    amount: string;
    created_at?: Date;
    updated_at?: Date;
}