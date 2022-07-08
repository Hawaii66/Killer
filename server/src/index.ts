import cors = require("cors");
import express = require("express");
import { Routes } from "./Routes/Routes";
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());

Routes(app);

app.listen(PORT, ()=>{
    console.log("Server listening on: http://localhost:" + PORT);
});