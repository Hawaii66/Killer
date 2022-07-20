import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GetAlive } from "../Database/Statistics";
import { CToSEvents, SToCEvents } from "../../../Shared/Socket";
import { AcceptDeath, GetDeath, GetUserDeaths } from "../Database/Deaths";
import { GetUserHitman, GetUserTarget } from "../Database/User";

type UserSocket = 
{
    socket: Socket<CToSEvents, SToCEvents, DefaultEventsMap, any>,
    userID:string
}

var sockets:UserSocket[] = [];

const GetUserID = (id:string) => {
    for(var i = 0; i < sockets.length; i ++)
    {
        if(sockets[i].socket.id === id)
        {
            return sockets[i];
        }
    }

    return null;
}

export const SocketRoutes = (io:Server<CToSEvents, SToCEvents, DefaultEventsMap, any>) => {
    sockets = [];
    console.log("Reset Sockets");

    io.on("connection", socket => {
        socket.on("join", async data => {
            if(sockets.every(socket=>{
                return socket.userID !== data.userID
            }))
            {
                sockets.push({
                    socket,
                    userID:data.userID
                });
            }
            

            const stats = await GetAlive();

            socket.emit("meta", stats)

            const deaths = await GetUserDeaths(data.userID);
            if(deaths.target !== null && !deaths.target.tNotification) 
            {
                socket.emit("death");
            }
            if(deaths.hitman !== null && !deaths.hitman.hNotification)
            {
                const target = await GetUserHitman(data.userID);
                socket.emit("hitmanSuccess", {
                    nextTarget:{
                        firstName:target.forename,
                        group:target.group,
                        id:target.id,
                        lastName:target.lastname,
                        type:target.type
                    }
                });
            }
        });

        socket.on("disconnect", () => {
            sockets = sockets.filter((user) => {
                return user.socket.id !== socket.id;
            });
        });

        socket.on("deathAccepted", async data => {
            const user = GetUserID(socket.id);
            if(user === null) return;

            await AcceptDeath(user.userID, data.userDied);
        });
    });
}

export const GetSocket = (userID:string):UserSocket|null => {
    for(var i = 0; i < sockets.length; i ++)
    {
        if(sockets[i].userID === userID) return sockets[i];
    }

    return null;
}

export const GetAllSockets = ():UserSocket[] => {
    return sockets;
}

export const SendMetaDataToAll = async () => {
    const stats = await GetAlive();

    GetAllSockets().forEach(userSocket => {
        userSocket.socket.emit("meta", stats);
    });
}