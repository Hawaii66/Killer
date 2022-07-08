import {Express} from "express";

export const Routes = (app:Express) => {
    app.get("/", (_,res)=>{
        res.status(200).send("Server online, Hello World!");
    });
}