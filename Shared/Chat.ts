export interface Message {
    sender:string,
    text:string,
    date:number,
    id:string
}

export interface Chat {
    messages:Message[],
    target:string,
    hitman:string
}

export const DefaultChat:Chat = {
    messages:[],
    target:"",
    hitman:""
}