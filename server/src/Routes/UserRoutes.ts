import { Response } from "express";
import { AccessType, GetUser } from "../Database/User";
import { AuthedRequest, AuthUser } from "../Functions/AuthUser";


const express = require("express");
const router = express.Router();

router.get("/:id/all",AuthUser, async (req:AuthedRequest,res:Response)=>{
    if(req.userID !== req.params.id) return res.sendStatus(400);

    const dbUser = await GetUser(req.userID, AccessType.ID);

    res.status(200).json(dbUser);
});

router.get("/:id/name",AuthUser, async (req:AuthedRequest, res:Response) => {
    if(req.userID !== req.params.id) return res.sendStatus(400);

    const {forename, lastname} = await GetUser(req.userID, AccessType.ID);

    res.json({
        name:forename + " " + lastname
    });
});

router.get("/:id/stats", AuthUser, async (req:AuthedRequest, res:Response) => {
    if(req.userID !== req.params.id) return res.sendStatus(400);
   
    const {kills, alive, type} = await GetUser(req.userID, AccessType.ID);

    res.json({
        kills,
        alive,
        type
    });
});

export default router;