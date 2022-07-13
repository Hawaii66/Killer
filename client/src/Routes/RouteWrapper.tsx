import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import { useDeadline } from '../Hooks/useDeadline';
import Home from './Home'
import WiatForStart from './WiatForStart'

function RouteWrapper() {
	const [startDate, setStartDate] = useState("");
	const [loading ,setLoading] = useState(true);
	const navigate = useNavigate();

	const fetchDeadline = async () => {
		const result = await fetch("http://localhost:5000/default/deadline",{
			method:"GET",
			headers:{
				"Content-Type":"application/json"
			}
		});
		if(result.status !== 200) return;

		const startTime = new Date((await result.json()).time).getTime();
		const currentDate = new Date(Date.now()).getTime();

		if(startTime - currentDate > 0)
		{
			navigate("/wait",{replace:true});
		}
		setLoading(false);
	}

	useEffect(()=>{
		fetchDeadline();
	},[]);

	if(loading)
	{
		return(
			<Container sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",flexDirection:"column"}}>
				<CircularProgress color="primary" thickness={10} size={100}/>
				<Typography sx={{width:"100vw"}} align="center" variant="h4" component="h1" color="primary">Laddar</Typography>
			</Container>
		)
	}

	return (
		<Routes>
			<Route path="/" element={<Home />}/>
			<Route path="/wait" element={<WiatForStart/>} />
			<Route path="*" element={<Link to={"/"}/>} />
		</Routes>	
	)
}

export default RouteWrapper