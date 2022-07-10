import { Avatar, Button, IconButton, Skeleton, SxProps, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext';
import { useDeadline } from '../../Hooks/useDeadline';
import { useGet } from '../../Hooks/useFetch';
import UserInfo from './UserInfo';

const btn:SxProps = {
	marginTop:"1rem",
	paddingTop:"0.4rem",
	paddingBottom:"0.4rem"
}

const wideBtn:SxProps = {
	...btn,
	width:"12rem"
}

const header:SxProps = {
	marginBottom:"1rem"
}

const timer:SxProps = {
	marginBottom:"1rem"
}

const avatar:SxProps = {
	position:"absolute",
	top:20,
	right:20,
	backgroundColor:"#BDBDBD",
	width:"4rem",
	height:"4rem",
	borderRadius:"50%",
	overflow:"hidden",
	padding:0
}

const avatarText:SxProps = {
	fontWeight:700
}

function LoginHome() {
	const [deadline,setDeadline] = useState("");
	const [show,setShow] = useState(false);
	const time = useDeadline(deadline);
	
	const {user} = useContext(UserContext);

	const [data, loading, refresh] = useGet<{time:string}>({path:"/default/deadline",start:false});
	
	useEffect(()=>refresh(),[]);

	useEffect(()=>{
		console.log(data);
		if(data === undefined) return;

		if(data.time !== undefined) setDeadline(data.time);
	},[loading]);

	const getDate = () => {
		if(time.days === "0"){
			return `${time.hours}:${time.minutes}:${time.seconds}`
		}
		return `${time.days} dagar & ${time.hours}:${time.minutes}:${time.seconds}`
	}

	const isNullDate = time.days === "0" && time.hours === "0" && time.minutes === "0" && time.seconds === "0";

	return (
		<div className={"flex-center"}>
			{user.id !== "" && 
				<Button sx={avatar} onClick={()=>setShow(true)} aria-label="close">
					<Typography align="center" color="primary" variant="h4" sx={avatarText}>{user.forename[0] + user.lastname[0]}</Typography>
				</Button>
			}
			<Typography sx={header} align="center" color="primary" variant="h1">Killer</Typography>
			<Typography sx={timer} align="center" color="secondary" variant="h5">{loading || isNullDate  ? <Skeleton width={"18rem"} height={"2rem"} /> : `Startar om: ${getDate()}`}</Typography>
			{user.id === "" && <>
				<Button sx={wideBtn} variant="contained" color="primary">SKAPA KONTO</Button>
				<Button sx={btn} variant="contained" color="primary">LOGGA IN</Button>
			</>}

			<UserInfo show={show} setShow={(s)=>setShow(s)}/>
		</div>
	)
}

export default LoginHome