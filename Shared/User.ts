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
    group:string,
    password:string,
    type:KillerType,
    pin:string
}

export const DefaultUser:User = {
    alive:false,
    group:"",
    email:"",
    forename:"",
    hitman:"",
    id:"",
    kills:-1,
    lastname:"",
    password:"",
    phone:"",
    target:"",
    type:KillerType.Normal,
    year:0,
    pin:"0000"
}