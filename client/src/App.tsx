import { ThemeProvider } from '@emotion/react';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import {CircularProgress, Container, Typography } from "@mui/material";

import "./app.css";
import { UserContext } from './Contexts/UserContext';
import { User, DefaultUser, KillerType } from './Interfaces/User';
import RouteWrapper from './Routes/RouteWrapper';
import { theme } from './ThemeProvider';

function App() {
	const [user,_setUser] = useState<User>(DefaultUser);
	const [accessToken, _setAccessToken] = useState("");
	const [refreshToken, _setRefreshToken] = useState("");

	const setUser = (user:User) => _setUser(user);
	const setAccessToken = (token:string) => _setAccessToken(token);
	const setRefreshToken = (token:string) => _setRefreshToken(token);

	const [checkingSession, setChecking] = useState(true);

	const checkIfPreviousSessionLogin = async () => {
		const localAccessToken = localStorage.getItem("accesstoken");
		const localRefreshToken = localStorage.getItem("refreshtoken");
		const localuserid = localStorage.getItem("userid");
		if(localAccessToken === null || localRefreshToken === null || localuserid === null)
		{
			setChecking(false);
			return;
		}

		if(localAccessToken === "" || localRefreshToken === "" || localuserid === "")
		{
			setChecking(false);
			return;
		}

		const tokenResponse = await fetch(`http://localhost:5000/auth/token`,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({token:localRefreshToken})
		});
		const tokenData = await tokenResponse.json();

		const userResponse = await fetch(`http://localhost:5000/users/${localuserid}/all`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Authorization":`Bearer ${tokenData.accessToken}`
			}
		});

		const localUser = await userResponse.json();
		setUser(localUser);
		setAccessToken(tokenData.accessToken);
		setRefreshToken(localRefreshToken);
		setChecking(false);
	}

	useEffect(()=>{
		checkIfPreviousSessionLogin();
	},[]);

	if(checkingSession)
	{
		return(
			<Container sx={{display:"flex",justifyContent:"center",alignItems:"center",width:"100vw",height:"100vh",flexDirection:"column"}}>
				<CircularProgress color="primary" thickness={10} size={100}/>
				<Typography sx={{width:"100vw"}} align="center" variant="h4" component="h1" color="primary">Loggar in dig</Typography>
			</Container>
		)
	}

	return (
		<BrowserRouter>
				<ThemeProvider theme={theme}>
					<UserContext.Provider value={{
						setUser,
						user,
						accessToken,
						refreshToken,
						setAccessToken,
						setRefreshToken
					}}>
						<RouteWrapper />
					</UserContext.Provider>
				</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
