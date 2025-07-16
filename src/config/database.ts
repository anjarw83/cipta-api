import mongoose from "mongoose";
import dotenv from 'dotenv'
import path from "path";

dotenv.config({path: path.resolve(__dirname, '../.env')});

const connectDB = async(): Promise<void> => {

    const mongoUri  = process.env.MONGODB_URL;// || 'mongodb://localhost:27017';
    if(!mongoUri){
        console.log('MongoDB Connection Empty')
        process.exit(1);
    }
    try{
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    }catch (error) {
        console.error('Mongodb Connection Error');
        process.exit(1);
    }
}

export default connectDB;