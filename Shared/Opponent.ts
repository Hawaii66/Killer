import { KillerType } from "./User"

export interface ITarget
{
    forename:string,
    lastname:string,
    group:string,
    type:KillerType,
    id:string
}

export interface IHitman
{
    id:string
}