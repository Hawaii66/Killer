import cors = require("cors");
import express = require("express");
import { Server } from "socket.io";
import http = require("http");

import Routes from "./Routes/AdminRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";
import DefaultRoutes from "./Routes/DefaultRoutes";
import KillerRoutes from "./Routes/KillerRoutes";
import { SocketRoutes } from "./Socket/Socket";
import { CToSEvents, SToCEvents } from "../../Shared/Socket";
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server<CToSEvents, SToCEvents>(server,{
    cors:{
        origin:"*"
    }
});

const PORT = process.env.PORT || 5000;

SocketRoutes(io);


app.use("/admin", Routes);
app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/default", DefaultRoutes);
app.use("/killer", KillerRoutes);

app.get("/",(_,res)=>{
    res.send("Server online");
});


server.listen(PORT, ()=>{
    console.log("Server listening on: http://localhost:" + PORT);
});