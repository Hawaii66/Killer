import { createContext } from "react";
import { DefaultUser, User } from "../Interfaces/User";

export interface IStaticContext{
    website:string,
    api:string
}

export const LocalStatic:IStaticContext = {
    website:"http://localhost:3000",
    api:"http://localhost:5000"
}

export const DebugStatic:IStaticContext = {
    website:"http://192.168.1.16:3000",
    api:"https://192.168.1.16:5000"
}

export const ProdStatic:IStaticContext = {
    website:"",
    api:""
}

export const StaticContext = createContext<IStaticContext>(LocalStatic);