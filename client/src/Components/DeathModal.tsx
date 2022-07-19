import { Dialog, DialogActions, DialogContent, DialogTitle, Button, CircularProgress } from "@mui/material";
import React, { useContext, useState } from "react";
import { UserContext } from "../Contexts/UserContext";
import StyledTextField from "../Routes/WaitForStart/StyledTextField";
import { theme } from "../ThemeProvider";

interface Props {
	userDied:boolean,
	show:boolean,
	setShow:(state:boolean)=>void
}

function DeathModal({userDied, show, setShow}:Props)
{
	const [loading, setLoading] = useState(false);
	const [password, setPassword] = useState("");
	const [pin, setPin] = useState("");
	const {getAccessToken} = useContext(UserContext);

	const DeathClicked = async () => {
		setLoading(true);

		const response = await fetch(`http://localhost:5000/killer/death`,{
			method:"POST",
			headers:{
				"Content-Type":"application/json",
				"Authorization":`Bearer ${await getAccessToken()}`
			},
			body:JSON.stringify({
				userDied,
				password,
				pin
			})
		});
		const data = await response.json();
		if(!data.new)
		{
			await fetch(`http://localhost:5000/killer/add`,{
				method:"POST",
				headers:{
					"Content-Type":"application/json",
					"Authorization":`Bearer ${await getAccessToken()}`
				},
				body:JSON.stringify({
					userDied,
					password,
					pin
				})
			});
		}		

		setLoading(false);
		setShow(false);
	}

	const DialogLoading = () => {
		return(
			<>
				<DialogTitle>Laddar...</DialogTitle>
				<DialogContent sx={{
					display:"flex",
					justifyContent:"center",
					alignItems:"center"
				}}>
					<CircularProgress color="primary" />
				</DialogContent>
			</>
		)
	}

	return(
		<Dialog
			PaperProps={{style:{minHeight:"50%",width:"90%",backgroundColor:`#${theme.palette.background.default}`}}}
			open={show}
		>
			{
				loading ? DialogLoading() : <>
				<DialogTitle>{userDied ? "Du dog" : "Du mördade"}</DialogTitle>
				<DialogContent>
					<StyledTextField 
						helper=""
						label="Ditt Lösenord"
						placeHolder="Lösenord"
						text={password}
						setText={(s)=>setPassword(s)}
					/>
					<StyledTextField 
						helper="Finns i hens profil, längst upp till vänster"
						label="Motståndares PIN Kod"
						placeHolder={userDied ? "Mördares PIN kod" : "Offers PIN kod"}
						text={pin}
						setText={(s)=>setPin(s)}
					/>
				</DialogContent>

				<DialogActions>
					<Button variant="outlined" color="primary" onClick={()=>setShow(false)}>Tillbaka</Button>
					<Button variant="contained"  color="primary" onClick={()=>DeathClicked()}>Fortsätt</Button>
				</DialogActions>
			</>}
		</Dialog>
	)
}

export default DeathModal;
