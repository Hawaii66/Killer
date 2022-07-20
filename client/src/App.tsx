import { ThemeProvider } from '@emotion/react';
import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import {CircularProgress, Container, Typography } from "@mui/material";

import "./app.css";
import { UserContext } from './Contexts/UserContext';
import { User, DefaultUser, KillerType } from './Interfaces/User';
import RouteWrapper from './Routes/RouteWrapper';
import { theme } from './ThemeProvider';
import SocketWrapper from './Routes/SocketWrapper';
import TargetDeathAnimation from './Components/Animations/TargetDeathAnimation';
import AnimationWrapper from './Components/Animations/AnimationWrapper';
import { DefaultTarget, DefaultHitman, OpponentContext } from './Contexts/OpponentContext';
import { SystemSecurityUpdateWarningSharp } from '@mui/icons-material';
import StaticWrapper from './Routes/StaticWrapper';
import { StaticContext } from './Contexts/StaticContext';

function App() {
	const [user,_setUser] = useState<User>(DefaultUser);
	const [accessToken, _setAccessToken] = useState("");
	const [refreshToken, _setRefreshToken] = useState("");

	const setUser = async (newUser:User) => {
		_setUser(newUser);
		refreshTargetHitman(newUser,await getAccessToken())
	};
	const setAccessToken = (token:string) => _setAccessToken(token);
	const setRefreshToken = (token:string) => _setRefreshToken(token);

	const [target, setTarget] = useState(DefaultTarget);
	const [hitman, setHitman] = useState(DefaultHitman);

	const [checkingSession, setChecking] = useState(true);

	const {api} = useContext(StaticContext);

	const getAccessToken = async () => {
		const response = await fetch(`${api}/auth/test`,{
			method:"GET",
			headers:{
				"Authorization":`Bearer ${accessToken}`
			}
		});

		if(response.status === 200)
		{
			return accessToken
		}
		else
		{
			const tokenResponse = await fetch(`${api}/auth/token`,{
				method:"POST",
				headers:{
					"Content-Type":"application/json"
				},
				body:JSON.stringify({token:refreshToken})
			});
			const tokenData = await tokenResponse.json();
			setAccessToken(tokenData.accessToken);
			return tokenData.accessToken;
		}
	}

	const refreshTargetHitman = async (localUser:User, accessToken:string) => {
		if(localUser.target === "" || localUser.hitman === "")
		{
			setTarget(DefaultTarget);
			setHitman(DefaultHitman);
		}

		const opponentResponses = await Promise.all([
			fetch(`${api}/users/${localUser.target}/target`,{
				method:"GET",
				headers:{
					"Content-Type":"application/json",
					"Authorization":`Bearer ${accessToken}`
				}
			}),
			fetch(`${api}/users/${localUser.hitman}/hitman`,{
				method:"GET",
				headers:{
					"Content-Type":"application/json",
					"Authorization":`Bearer ${accessToken}`
				}
			})
		]);
		const opponentInfo = await Promise.all(opponentResponses.map(result=>result.json()))

		setTarget(opponentInfo[0]);
		setHitman(opponentInfo[1]);
	}

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

		const tokenResponse = await fetch(`${api}/auth/token`,{
			method:"POST",
			headers:{
				"Content-Type":"application/json"
			},
			body:JSON.stringify({token:localRefreshToken})
		});
		const tokenData = await tokenResponse.json();

		const userResponse = await fetch(`${api}/users/${localuserid}/all`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Authorization":`Bearer ${tokenData.accessToken}`
			}
		});

		const localUser = await userResponse.json();
		await refreshTargetHitman(localUser, tokenData.accessToken);
		
		setUser(localUser);
		setAccessToken(tokenData.accessToken);
		setRefreshToken(localRefreshToken);
		setChecking(false);
	}

	useEffect(()=>{
		checkIfPreviousSessionLogin();
	},[]);

	useEffect(()=>{
		const refresh = async () => {
		refreshTargetHitman(user, await getAccessToken());
		}
		refresh()
	},[user])

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
						getAccessToken,
						user,
						accessToken,
						refreshToken,
						setAccessToken,
						setRefreshToken
					}}>
						<OpponentContext.Provider value={{
							target:target,
							hitman:hitman,
							setTarget:(t)=>setTarget(t),
							setHitman:(h)=>setHitman(h)
						}}>
							<SocketWrapper>
								<AnimationWrapper />
								<RouteWrapper />
							</SocketWrapper>
						</OpponentContext.Provider>
					</UserContext.Provider>
				</ThemeProvider>
		</BrowserRouter>
	);
}

export default App;
