import { CircularProgress, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { BrowserRouter, Link, Route, Routes, useNavigate } from 'react-router-dom'
import TargetDeathAnimation from '../Components/Animations/TargetDeathAnimation';
import { useDeadline } from '../Hooks/useDeadline';
import Home, { HomeRoutes } from './Home'
import Elev from './Home/Elev/Elev';
import Information from './Home/Information/Information';
import Rules from './Home/Rules/Rules';
import Settings from './Home/Settings/Settings';
import Login from './WaitForStart/Login/Login';
import WiatForStart from './WiatForStart'

function RouteWrapper() {
	const [mode,_setMode] = useState(HomeRoutes.Home);
	const [loading ,setLoading] = useState(true);
	const navigate = useNavigate();

	const setMode = (mode:HomeRoutes) => _setMode(mode);

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
			<Route path="/wait" element={<WiatForStart/>} />
			<Route path="/login" element={<Login setState={(_)=>{navigate("/")}}/>} />
			<Route path="/" element={<Home mode={mode} setMode={setMode}/>}/>
			<Route path="/home/settings" element={<Settings />}/>
			<Route path="/home/stats" element={<div>Sttas</div>}/>
			<Route path="/home/rules" element={<Rules />}/>
			<Route path="/home/elev" element={<Elev />} />
			<Route path="/home/information" element={<Information />} />
			<Route path="/home/*" element={<Home mode={mode} setMode={setMode}/>}/>
			<Route path="*" element={<Home mode={mode} setMode={setMode}/>} />
		</Routes>	
	)
}

export default RouteWrapper