import { NextFunction, Request, Response} from "express";
import { AccessType, GetUser } from "../Database/User";

const jwt = require("jsonwebtoken");

export interface AuthedRequest extends Request {
    userID:string
}

export function AuthUser(req:AuthedRequest,res:Response,next:NextFunction)
{
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(400);
    if((authHeader.split(" ").length < 2)) return res.sendStatus(400);
    const token = authHeader.split(" ")[1];
    if(token === null) return res.sendStatus(400);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err: any, user: { email: string; }) => {
        if(err) return res.sendStatus(403);

        req.userID = (await GetUser(user.email, AccessType.EMAIL)).id;
        next();
    });
}

export function AuthUserIDParam(req:AuthedRequest,res:Response,next:NextFunction)
{
    const authHeader = req.headers["authorization"];
    if(!authHeader) return res.sendStatus(400);
    if((authHeader.split(" ").length < 2)) return res.sendStatus(400);
    const token = authHeader.split(" ")[1];
    if(token === null) return res.sendStatus(400);

    jwt.verify(token, process.env.JWT_ACCESS_TOKEN, async (err: any, user: { email: string; }) => {
        if(err) return res.sendStatus(403);

        req.userID = (await GetUser(user.email, AccessType.EMAIL)).id;
        if(req.userID !== req.params.id)
        {
            res.status(400).send("Wrong user access");
            return;
        }

        next();
    });
}