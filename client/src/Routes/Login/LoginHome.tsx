import { Button, SxProps, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../Contexts/UserContext';
import { useDeadline } from '../../Hooks/useDeadline';
import { useGet } from '../../Hooks/useFetch';

const btn:SxProps = {
	marginTop:"1rem"
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

function LoginHome() {
	const [deadline,setDeadline] = useState("");
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

	return (
		<div className={"flex-center"}>
			<Typography sx={header} align="center" color="primary" variant="h1">Killer</Typography>
			<Typography sx={timer} align="center" color="secondary" variant="h5">Startar om: {getDate()}</Typography>
			{user.id === "" && <>
				<Button sx={wideBtn} variant="contained" color="primary">SKAPA KONTO</Button>
				<Button sx={btn} variant="contained" color="primary">LOGGA IN</Button>
			</>}
		</div>
	)
}

export default LoginHome