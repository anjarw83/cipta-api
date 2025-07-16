import express, {Application, Request, Response} from "express";
import routes from "./routes/routes";

export const init = () => {
    const app: Application = express();
    const port = 3000;

    app.use(express.json())
    app.use(routes);

    app.listen(port, () => {
        console.log(`Server Running at port ${port}`);
    });
}
export const start = () =>{
    init();
}
start();