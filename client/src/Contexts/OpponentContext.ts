import { createContext } from "react";
import { ITarget, IHitman } from "../Interfaces/Opponent";
import { DefaultUser, KillerType, User } from "../Interfaces/User";



export interface IOpponentContext{
    target:ITarget,
    hitman:IHitman,
    setTarget:(target:ITarget)=>void,
    setHitman:(hitman:IHitman)=>void
}

export const DefaultTarget:ITarget = {
    forename:"",
    lastname:"",
    group:"",
    type:KillerType.Normal,
    id:""
}

export const DefaultHitman:IHitman = {
    id:""
}

export const OpponentContext = createContext<IOpponentContext>({
    hitman:DefaultHitman,
    target:DefaultTarget,
    setTarget:(target)=>{},
    setHitman:(hitman)=>{}
});