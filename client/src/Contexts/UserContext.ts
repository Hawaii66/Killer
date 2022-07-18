import { createContext } from "react";
import { DefaultUser, User } from "../Interfaces/User";

export interface IUserContext{
    user:User,
    setUser:(user:User)=>void,
    getAccessToken:()=>Promise<string>,
    refreshToken:string,
    accessToken:string,
    setAccessToken:(token:string)=>void,
    setRefreshToken:(token:string)=>void
}

export const UserContext = createContext<IUserContext>({
    setUser:(user)=>{},
    getAccessToken:()=>new Promise(()=>""),
    user:DefaultUser,
    accessToken:"",
    refreshToken:"",
    setAccessToken:(t)=>{},
    setRefreshToken:(t)=>{}
});