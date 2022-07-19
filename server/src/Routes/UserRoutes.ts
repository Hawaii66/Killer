import { Response } from "express";
import { IHitman, ITarget } from "../../../Shared/Opponent";
import { AccessType, GetUser } from "../Database/User";
import { AuthedRequest, AuthUser, AuthUserIDParam } from "../Functions/AuthUser";


const express = require("express");
const router = express.Router();

router.get("/:id/all",AuthUserIDParam, async (req:AuthedRequest,res:Response)=>{
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

router.get("/:id/target", AuthUser, async (req:AuthedRequest, res:Response) => {
    const user = await GetUser(req.params.id, AccessType.ID);
    const requestUser = req.userID;

    if(user.hitman !== requestUser) return res.status(400).send("Wrong user authentication");

    const targetInfo:ITarget = {
        forename:user.forename,
        group:user.group,
        id:user.id,
        lastname:user.lastname,
        type:user.type
    }
    
    res.json(targetInfo);
});

router.get("/:id/hitman", AuthUser, async (req:AuthedRequest, res:Response) => {
    const user = await GetUser(req.params.id, AccessType.ID);
    const requestUser = req.userID;

    if(user.target !== requestUser) return res.status(400).send("Wrong user authentication");

    const hitmanInfo:IHitman = {
        id:user.id
    }
    
    res.json(hitmanInfo);
});

export default router;