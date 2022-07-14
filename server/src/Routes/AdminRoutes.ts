import {Express, Response, Request, response} from "express";
import { AddRandomUser, BulkWriteOperationType, BulkWriteOperationTypeExtra, ExecuteOps, GetAllUsers, GetUser, UpdateUserCircle } from "../Database/User";
import { KillerType, User } from "../../../Shared/User";
import { GetPath } from "../Functions/GetPath";
import { AdminAuth, AdminRequest } from "../Middelware/AdminAuth";
import { GenerateCircle } from "../Functions/GenerateCircle";
import { CreateUser } from "./AuthRoutes";
import { faker } from "@faker-js/faker";
import { ChangeStartTime } from "../Database/Config";

const express = require("express");
var csv = require('csv-express')

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

    const returnData:string[] = users.map(user=>{
        return user.forename + " " + user.lastname + " " + user.group + " " + user.id;
    })

    res.json(returnData);
});

interface CircleUser
{
    forename:string,
    lastname:string,
    group:string,
    userid:string
}
router.post("/circle/set", async(req:Request, res:Response) => {
    var dataName:string[] = req.body;

    const userdata:CircleUser[] = dataName.map(user=>{
        return({
            forename:user.split(" ")[0],
            lastname:user.split(" ")[1],
            group:user.split(" ")[2],
            userid:user.split(" ")[3]
        });
    });

    console.log(userdata);
    const ops: BulkWriteOperationTypeExtra<{forename:string,lastname:string,group:string}>[] =[];
    
    var previousUser:CircleUser = userdata[userdata.length - 1];
    var nextUser:CircleUser = userdata[1];
    for(var i = 0; i < userdata.length; i ++)
    {
        nextUser = userdata[i === userdata.length - 1 ? 0 : i + 1];

        ops.push({
            updateOne:{
                filter:{
                    forename:userdata[i].forename,
                    group:userdata[i].group,
                    lastname:userdata[i].lastname
                },
                update:{
                    $set:{
                        alive:true,
                        hitman:previousUser.userid,
                        kills:0,
                        target:nextUser.userid
                    }
                },
                upsert:false
            }
        });

        previousUser = userdata[i];
    }

    await ExecuteOps(ops);

    res.json(ops);
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

router.post("/config/time", async (req:Request, res:Response) => {
    const time = req.body.time;

    await ChangeStartTime(time);

    res.send("Time successfully updated to: " + time);
})

export default router;