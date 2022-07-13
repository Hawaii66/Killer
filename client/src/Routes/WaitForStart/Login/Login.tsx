import { Button, Container, SxProps, Typography } from '@mui/material'
import React, { useState, useContext } from 'react'
import { LoginUser } from '../../../Utils/UserAuth'
import { State } from '../../WiatForStart'
import StyledTextField from '../StyledTextField'
import {UserContext} from "../../../Contexts/UserContext";

interface Props {
    setState:(s:State) => void
}

const classes:{[key:string]:SxProps} = {
	title:{
		paddingTop:"3rem",
		textDecorationStyle:"solid",
		textDecorationWidth:"1px",
		textDecorationColor:"primary",
		textDecorationLine:"underline"
	},
	center:{
		width:"100vw",
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"column",
		marginTop:"2rem"
	},
	btn:{
		minWidth:"10rem",
		minHeight:"2.5rem"
	}
}

function Login({setState}:Props) {
	const [email,setEmail] = useState("");
	const [password, setPassword] = useState("");
	
	const {setUser, setAccessToken, setRefreshToken} = useContext(UserContext);

	const login = async () => {
		const {refreshToken, accessToken, userID} = await LoginUser({email, password});
		const userResponse = await fetch(`http://localhost:5000/users/${userID}/all`,{
			method:"GET",
			headers:{
				"Content-Type":"application/json",
				"Authorization":`Bearer ${accessToken}`
			}
		});

		const user = await userResponse.json();

		setUser(user);
		setRefreshToken(refreshToken);
		setAccessToken(accessToken);
		setState(State.Wait);
	}

	return(
		<>
			<Typography sx={classes.title} variant="h1" color="primary" align="center">Killer</Typography>
			<Container
				sx={classes.center}
			>
				<StyledTextField 
					helper=''
					label='Email'
					placeHolder='Email'
					setText={(e)=>setEmail(e)}
					text={email}
					disabled={false}
				/>
				<StyledTextField 
					helper=''
					label='Lösenord'
					placeHolder='Lösenord'
					setText={(e)=>setPassword(e)}
					text={password}
					disabled={false}
				/>
			</Container>
			<Container
				sx={classes.center}
			>
				<Button
					sx={classes.btn}
					variant="contained"
					onClick={()=>login()}
				>
					Logga in
				</Button>
			</Container>
		</>
	)
}

export default Login