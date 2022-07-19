import { Response } from "express";
import { GetSocket } from "../Socket/Socket";
import { AddChat, GetConversation } from "../Database/Chat";
import { AccessType } from "../Database/User";
import { GetUser } from "../Database/User";
import { AuthedRequest, AuthUser } from "../Functions/AuthUser";

const express = require("express");
const router = express.Router();

router.post("/get", AuthUser, async (req:AuthedRequest, res:Response) => {
    const {hitman, target,isHitman}:{
        hitman:string,
        target:string,
        isHitman:boolean
    } = req.body;

    const hitmanUser = await GetUser(hitman, AccessType.ID);
    const targetUser = await GetUser(target, AccessType.ID);
    const user = await GetUser(req.userID, AccessType.ID);

    if(hitmanUser.target !== targetUser.id) return res.sendStatus(400);
    if(targetUser.hitman !== hitmanUser.id) return res.sendStatus(400);

    if(isHitman && user.id !== hitman){ return res.sendStatus(400)};
    if(!isHitman && user.id !== target){ return res.sendStatus(400)};

    const conversation = await GetConversation(hitman, target);
    if(conversation === null) return res.sendStatus(500);

    res.json(conversation);
});

router.post("/add", AuthUser, async (req:AuthedRequest, res:Response) => {
    const {target, hitman, isHitman, text}:{
        target:string,
        hitman:string,
        isHitman:boolean,
        text:string
    } = req.body;

    const hitmanUser = await GetUser(hitman, AccessType.ID);
    const targetUser = await GetUser(target, AccessType.ID);
    const user = await GetUser(req.userID, AccessType.ID);

    if(hitmanUser.target !== targetUser.id) return res.sendStatus(400);
    if(targetUser.hitman !== hitmanUser.id) return res.sendStatus(400);

    if(isHitman && user.id !== hitman){ return res.sendStatus(400)};
    if(!isHitman && user.id !== target){ return res.sendStatus(400)};

    const message = await AddChat(hitman, target, isHitman, text);

    const otherUserSocket = GetSocket(isHitman ? target : hitman);
    if(otherUserSocket === null) return;

    otherUserSocket.socket.emit("chat", message);
    res.sendStatus(200);
});

export default router;