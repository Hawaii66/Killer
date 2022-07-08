import {Express, Response, Request, response} from "express";
import { AddRandomUser, GetAllUsers, UpdateUserCircle } from "../Database/User";
import { KillerType, User } from "../../../Shared/User";
import { GetPath } from "../Functions/GetPath";
import { AdminAuth, AdminRequest } from "../Middelware/AdminAuth";
import { GenerateCircle } from "../Functions/GenerateCircle";
import { CreateUser } from "./AuthRoutes";
import { faker } from "@faker-js/faker";

const express = require("express");

const router = express.Router();

router.use(AdminAuth);

router.get("/",(req:Request,res:Response)=>{
    res.send("Admin Page available");
});

router.get("/circle", async (req:Request, res:Response) => {
    const users = await GetAllUsers();
    res.json(users);
});

router.get("/circle/reset", async (req:Request, res:Response) => {
    var users:User[] = await GetAllUsers();
    
    users = GenerateCircle(users);

    await UpdateUserCircle(users);
    res.json(users);
});

router.post("/users/random", async (req:Request, res:Response) => {
    const user = await CreateUser({
        alive:false,
        group:"Na21B",
        email:faker.internet.email(),
        forename:faker.name.firstName(),
        hitman:"",
        id:"",
        kills:-1,
        lastname:faker.name.lastName(),
        password:faker.internet.password(),
        phone:faker.phone.number("+46 ## ### ####"),
        target:"",
        type:KillerType.Normal,
        year:0
    });

    res.json(user);
});

export default router;