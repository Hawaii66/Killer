import { Request, Response } from "express";
import { AuthedRequest, AuthUser } from "../Functions/AuthUser";
import { GetStartTime } from "../Database/Config";
import { AccessType, GetUser, GetUserHitman, GetUserTarget } from "../Database/User";
import { AddUser, CheckExists, ConfirmDeath, CreateDeath } from "../Database/Deaths";
import { GetAllSockets, GetSocket, SendMetaDataToAll } from "../Socket/Socket";

const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();

router.post("/death", AuthUser, async (req:AuthedRequest,res:Response) => {
    const user = await GetUser(req.userID, AccessType.ID);
    const deathMessage:{userDied:boolean,password:string,pin:string} = req.body;

    if(!await bcrypt.compare(deathMessage.password, user.password))
    {
        return res.status(400).send("Wrong Password");
    }
    const otherUser = deathMessage.userDied ? await GetUserHitman(user.id) : await GetUserTarget(user.id);
    if(otherUser.pin !== deathMessage.pin)
    {
        return res.status(400).send("Wrong PIN");
    }

    var death = await CheckExists(user.id, deathMessage.userDied);
    var isNewDeath = false;
    if(death === null)
    {
        isNewDeath = true;
        death = await CreateDeath(user.id,otherUser.id,deathMessage.userDied);
    }


    res.json({
        new:isNewDeath,
        death:death
    })
});

router.post("/add", AuthUser, async(req:AuthedRequest, res:Response) => {
    const user = await GetUser(req.userID, AccessType.ID);
    const deathMessage:{userDied:boolean, password:string, pin:string} = req.body;
    console.log(deathMessage);

    if(!await bcrypt.compare(deathMessage.password, user.password))
    {
        return res.status(400).send("Wrong Password");
    }
    const otherUser = deathMessage.userDied ? await GetUserHitman(user.id) : await GetUserTarget(user.id);
    if(otherUser.pin !== deathMessage.pin)
    {
        return res.status(400).send("Wrong PIN");
    }

    const isDead = await AddUser(user.id, otherUser.id, deathMessage.userDied);
    console.log(isDead);

    if(isDead)
    {
        const death = await ConfirmDeath(user.id, otherUser.id);
        if(death === null) return;

        await SendMetaDataToAll();
    
        const targetSocket = await GetSocket(death.target);
        if(targetSocket !== null)
        {
            targetSocket.socket.emit("death");
        }

        const hitmanSocket = await GetSocket(death.hitman);
        if(hitmanSocket !== null)
        {
            const nextTarget = await GetUserTarget(hitmanSocket.userID);
            hitmanSocket.socket.emit("hitmanSuccess",{
                nextTarget:{
                    firstName:nextTarget.forename,
                    lastName:nextTarget.lastname,
                    group:nextTarget.group,
                    id:nextTarget.id,
                    type:nextTarget.type
                }
            });
        }
    }

    res.sendStatus(200);
})

export default router;