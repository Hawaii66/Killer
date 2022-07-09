import { Request, Response } from "express";
import { GetStartTime } from "../Database/Config";

const express = require("express");

const router = express.Router();

router.get("/deadline", async (req:Request,res:Response) => {
    const time = await GetStartTime();
    res.status(200).json({time});
});

export default router;