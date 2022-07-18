import { userDB } from "./Database"

type GetAliveType = () => Promise<{
    total:number,
    alive:number
}>

export const GetAlive:GetAliveType = async () => {
    const users = await userDB.find();
    var total = 0;
    var alive = 0;
    users.forEach(user=>{
        total += 1;
        if(user.alive) alive += 1;
    });

    return {
        alive,
        total
    }
}