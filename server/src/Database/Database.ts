
import monk, { ICollection } from "monk";
require("dotenv").config();

if(process.env.MONGO_DB_URI === undefined){
    console.log("EXIT PROCESS NO CONNECTING TO DB");
    process.exit();
}

export const db = monk(process.env.MONGO_DB_URI);
export const userDB:ICollection = db.get("users");
export const tokenDB:ICollection = db.get("tokens");
export const configDB:ICollection = db.get("config");
export const deathDB:ICollection = db.get("deaths");
export const chatDB:ICollection = db.get("chat");

export function GetRandomID(key:string){
    var randomID = Date.now() + ":" + Math.floor(Math.random() * 1000000) + ":" + key;
    return randomID;
}