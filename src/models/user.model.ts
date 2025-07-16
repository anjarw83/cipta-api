import mongoose, {Schema} from "mongoose";
import {IUser} from "../common/interfaces/user.interface";

const UserSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: false },
    token: { type: String, required: false },
}, {
    toJSON: {
        transform: (doc, ret) =>{
            const { _id, __v, ...rest } = ret;
            return {
                id: _id,
                ...rest
            };
}
    },
    versionKey: false,
});

const UserModel = mongoose.model('User', UserSchema);

export default UserModel;