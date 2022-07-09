import { createContext } from "react";
import { DefaultUser, User } from "../Interfaces/User";

export interface IUserContext{
    user:User,
    setUser:(user:User)=>void
}

export const UserContext = createContext<IUserContext>({
    setUser:(user)=>{},
    user:DefaultUser
});