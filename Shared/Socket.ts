import { Message } from "./Chat"
import { KillerType } from "./User"

export interface CToSEvents
{
    join:({
        userID
    }:{userID:string})=>void,
    deathAccepted:({
        userDied
    }:{
        userDied:boolean
    })=>void
}

export interface SToCEvents
{
    meta:({
        alive,
        total
    }:{
        alive:number,
        total:number
    })=>void,
    death:()=>void,
    hitmanSuccess:({nextTarget}:{
        nextTarget:{
            firstName:string,
            lastName:string,
            group:string,
            id:string,
            type:KillerType
        }
    })=>void,
    chat:(message:Message)=>void
}