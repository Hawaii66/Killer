import { Response } from "express";
import { AuthedRequest, AuthUser } from "../Functions/AuthUser";


const express = require("express");
const router = express.Router();

router.get("/:id",AuthUser,(req:AuthedRequest,res:Response)=>{
    console.log(req.userID);
    res.sendStatus(200);
});

export default router;