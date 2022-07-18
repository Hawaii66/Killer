export interface CToSEvents
{
    join:({
        userID
    }:{userID:string})=>void,
}

export interface SToCEvents
{
    meta:({
        alive,
        total
    }:{
        alive:number,
        total:number
    })=>void
}