import {Express, Response, Request, response} from "express";
import { GetRandomID } from "../Database/Database";
import { KillerType, User } from "../../../Shared/User";
import { AccessType, GetUser, RegisterUser } from "../Database/User";
import { AddToken, HasToken } from "../Database/JWT";
import { NumberToKillerType } from "../Functions/NumberToType";
import GetRandomPin from "../Utils/Pin";

const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();

interface UserSmall {
    email:string,
    password:string
}

router.post("/token", async (req:Request, res:Response) => {
    const refreshToken = req.body.token;
    if(refreshToken === null) return res.sendStatus(400);
    if(! await HasToken(refreshToken)) return res.sendStatus(400);

    const refreshSecret = process.env.JWT_REFRESH_TOKEN || "";

    jwt.verify(refreshToken, refreshSecret, (err: any,user: { email: any; password: any; }) => {
        if(err) return res.sendStatus(400);

        const accessToken = generateToken({
            email:user.email,
            password:user.password
        });
        res.json({
            accessToken
        });
    });
});

router.post("/login", async (req:Request,res:Response)=>{
    const user:UserSmall = {
        email:req.body.email,
        password:req.body.password
    };

    const dbUser = await GetUser(user.email, AccessType.EMAIL);
    if(dbUser.id === "") return res.status(400).send("No user found with that email");

    if(await bcrypt.compare(user.password, dbUser.password))
    {
        const refreshSecret = process.env.JWT_REFRESH_TOKEN || "";

        const jwtData:UserSmall = user;
        const accessToken = generateToken(jwtData);
        const refreshToken = jwt.sign(jwtData, refreshSecret);

        await AddToken(refreshToken);

        return res.status(200).json({
            accessToken,
            refreshToken,
            id:dbUser.id
        });
    }

    res.status(400).send("Wrong password");
});

const generateToken = (data:UserSmall) => {
    const token = process.env.JWT_ACCESS_TOKEN || "";
    return jwt.sign(data, token, {expiresIn: 120});
}

router.post("/create", async (req:Request,res:Response)=>{
    const registeredUser = await CreateUser(req.body);    

    res.status(200).json(registeredUser);
});

export const CreateUser = async (reqBody:User) => {
    var password = reqBody.password;
    password = await bcrypt.hash(password, 10);

    const user:UserSmall = {
        email:reqBody.email,
        password:password
    };

    const registeredUser = await RegisterUser({
        alive:false,
        group:reqBody.group,
        email:user.email,
        forename:reqBody.forename,
        hitman:"",
        id:"",
        kills:-1,
        lastname:reqBody.lastname,
        password:user.password,
        phone:reqBody.phone,
        target:"",
        type:NumberToKillerType(reqBody.type),
        year:reqBody.year,
        pin:GetRandomPin()
    });

    return registeredUser;
}

export default router;