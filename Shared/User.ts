export enum KillerType {
    Hardcore,
    Osynlig,
    Camper,
    Normal
}

export interface User {
    alive:boolean,
    forename:string,
    lastname:string,
    email:string,
    phone:string,
    target:string,
    hitman:string,
    kills:number,
    id:string,
    year:number,
    class:string,
    password:string,
    type:KillerType
}