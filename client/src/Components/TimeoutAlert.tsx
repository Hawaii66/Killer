import { Alert, AlertTitle } from '@mui/material';
import { red } from '@mui/material/colors';
import React, { useEffect } from 'react'

interface Props{
    text:string,
	title:string
    time:number,
    show:boolean,
    setShow:(s:boolean)=>void
}

function TimeoutAlert({text,title,time,show,setShow}:Props) {
	useEffect(()=>{
		const timer = setTimeout(()=>{
			setShow(false)
		},time);

		return () => clearTimeout(timer);
	});

	if(show){
		return (
			<Alert sx={{backgroundColor:red[200]}} severity="error">
				<AlertTitle>{title}</AlertTitle>
				{text}
			</Alert>
		)
	}

	return (<></>)
}

export default TimeoutAlert;