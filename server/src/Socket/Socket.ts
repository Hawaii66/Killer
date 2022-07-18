import { Server, Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { GetAlive } from "../Database/Statistics";
import { CToSEvents, SToCEvents } from "../../../Shared/Socket";

type UserSocket = 
{
    socket: Socket<CToSEvents, SToCEvents, DefaultEventsMap, any>,
    userID:string
}

var sockets:UserSocket[] = [];

export const SocketRoutes = (io:Server<CToSEvents, SToCEvents, DefaultEventsMap, any>) => {
    io.on("connection", socket => {
        socket.on("join", async data => {
            sockets.push({
                socket,
                userID:data.userID
            });

            const stats = await GetAlive();

            socket.emit("meta", stats)
        });

        socket.on("disconnect", () => {
            sockets = sockets.filter((user) => {
                return user.socket.id !== socket.id;
            });
        });
    });
}