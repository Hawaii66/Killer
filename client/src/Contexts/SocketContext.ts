import { createContext } from "react";
import { Socket } from "socket.io-client";
import { SToCEvents, CToSEvents } from "../Interfaces/Socket";

export interface ISocketContext{
    socket:Socket<SToCEvents, CToSEvents>|null,
    alive:number,
    total:number
}

export const SocketContext = createContext<ISocketContext>({
    socket:null,
    alive:0,
    total:0
});