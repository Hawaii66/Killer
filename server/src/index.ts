import cors = require("cors");
import express = require("express");
import Routes from "./Routes/AdminRoutes";
import AuthRoutes from "./Routes/AuthRoutes";
import UserRoutes from "./Routes/UserRoutes";
import DefaultRoutes from "./Routes/DefaultRoutes";
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/admin", Routes);
app.use("/auth", AuthRoutes);
app.use("/users", UserRoutes);
app.use("/default", DefaultRoutes);

app.get("/",(_,res)=>{
    res.send("Server online");
});

app.listen(PORT, ()=>{
    console.log("Server listening on: http://localhost:" + PORT);
});