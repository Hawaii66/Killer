import { createContext } from "react";
import { DefaultUser, User } from "../Interfaces/User";

export interface IUserContext{
    user:User,
    setUser:(user:User)=>void,
    refreshToken:string,
    accessToken:string,
    setAccessToken:(token:string)=>void,
    setRefreshToken:(token:string)=>void
}

export const UserContext = createContext<IUserContext>({
    setUser:(user)=>{},
    user:DefaultUser,
    accessToken:"",
    refreshToken:"",
    setAccessToken:(t)=>{},
    setRefreshToken:(t)=>{}
});