import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import io, { Socket } from "socket.io-client";
import { SocketContext } from '../Contexts/SocketContext';
import { CToSEvents, SToCEvents } from '../Interfaces/Socket';

interface Props
{
	children:React.ReactNode
}

function SocketWrapper({children}:Props) {
	const [socket, setSocket] = useState<Socket<SToCEvents,CToSEvents>>(io("http://localhost:5000"));
	const [isConnected, setIsConnected] = useState(false);
	const [stats, setStats] = useState({
		alive:0,
		total:0
	})

	const {user} = useContext(UserContext);

	useEffect(()=>{
		socket.on("connect", () => {
			setIsConnected(true);

			socket.emit("join", {
				userID:user.id
			});
		});
		
		socket.on("meta", data => {
			setStats(data);
		});
	},[])

	return(
		<SocketContext.Provider value={{
			socket,
			alive:stats.alive,
			total:stats.total
		}}>
			{children}
		</SocketContext.Provider>
	)
}

export default SocketWrapper