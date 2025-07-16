import "reflect-metadata";
import express, {Application, Request, Response} from "express";
import routes from "./routes/routes";
import dotenv from "dotenv";
import connectDB from "./config/database";

export const init = async () => {
    dotenv.config();

    const app: Application = express();
    const port = 3000;

    app.use(express.json())
    app.use(routes);

    await connectDB();
    app.listen(port, () => {
        console.log(`Server Running at port ${port}`);
    });
}
export const start = async () =>{
    init();
}
start();