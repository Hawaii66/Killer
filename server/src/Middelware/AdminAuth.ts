import { NextFunction, Request, Response } from "express";

export interface AdminRequest extends Request{
    authed:boolean
}

export function AdminAuth(req:AdminRequest, res:Response, next:NextFunction){
    const authHeader = req.headers["authorization"];
    if(authHeader && authHeader.split(" ")[0] !== "Bearer")
    {
        return res.status(400).send("No bearer token available");
    }

    const token = authHeader && authHeader.split(" ")[1];

    if(token === null || token === undefined)
    {
        return res.status(400).send("No token available");
    }

    if(process.env.ADMIN_KEY === token)
    {
        req.authed = true;
        next();
        return;
    }

    res.status(400).send("Auth token failed");
}