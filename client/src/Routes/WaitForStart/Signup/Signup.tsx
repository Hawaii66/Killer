
import { Button, Container, MenuItem, SxProps, TextField, Typography, Dialog, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, CircularProgress } from '@mui/material'
import React,{useContext, useState} from 'react'
import { setSourceMapRange } from 'typescript'
import TimeoutAlert from '../../../Components/TimeoutAlert'
import { UserContext } from '../../../Contexts/UserContext'
import { usePost } from '../../../Hooks/useFetch'
import { KillerType, User } from '../../../Interfaces/User'
import { SignUpUser } from '../../../Utils/UserAuth'
import { State } from '../../WiatForStart'
import StyledTextField from '../StyledTextField'

interface Props {
  setState:(s:State)=>void
}

const classes:{[key:string]:SxProps} = {
	title:{
		paddingTop:"3rem",
		textDecorationStyle:"solid",
		textDecorationWidth:"1px",
		textDecorationColor:"primary",
		textDecorationLine:"underline"
	},
	margin:{
		marginLeft:"5%",
		marginTop:"5%"
	},
	center:{
		display:"flex",
		justifyContent:"center",
		marginTop:"2rem"
	},
	nextBtn:{
		width:"40%",
		height:"2.2rem"
	},
	redoBtn:{
		width:"50%",
		height:"3rem",
		fontSize:"2rem",
		fontWeight:"900"
	},
	bubble:{
		marginLeft:"5px",
		paddingLeft:"5px",
		backgroundColor:"#3E434D",
		width:"100%",
		height:"2rem",
		borderRadius:"7px",
		overflow:"hidden",
		display:"flex",
		justifyContent:"left",
		alignItems:"center",
		marginBottom:"0.5rem"
	},
	dialogBtns:{
		display:"flex",
		width:"100%",
		margin:"auto",
		justifyContent:"space-evenly",
		alignItems:"center",
		flexDirection:"row",
		marginTop:"1rem"
	},
	loadingContainer:{
		width:"100%",
		height:"100vh",
		marginBottom:0,
		marginTop:0,
		display:"flex",
		justifyContent:"center",
		alignItems:"center"
	}
}

const GetYearFromClass = (group:string) => {
	const year = parseInt(group[2] + group[3]) + 2000;
	const currentYear = (new Date(Date.now())).getFullYear();
	const offset = currentYear - year;
	return offset + 1;
}

const getClasses = () => {
	const lines = ["Na","Sa","Ek"];
	const letters = ["A","B"];

	const year = (new Date(Date.now())).getFullYear();
	const yearFirst = parseInt((year.toString()).substring(2, 4));
	const years = [yearFirst - 2, yearFirst - 1, yearFirst];
	var selectClasses:string[] = [];
	lines.forEach(line=>{
		years.forEach(year => {
			letters.forEach(letter=>{
				selectClasses.push(line + year + letter);
			});
		});
	});

	return selectClasses;
}

enum SignState{
	First,
	Confirm,
	Seccond,
	Loading
}

function Signup({setState}:Props) {
	const [name,setName] = useState("Förnamn Efternamn");
	const [email, setEmail] = useState("nnnnåå@nykopingsenskilda.se");
	const [phone,setPhone] = useState("+46 70 545 3110");
	const [selectedClass, setClass] = useState(getClasses()[0]);
	const [password, setPassword] = useState(["",""]);
	const [playerType, setPlayerType] = useState(KillerType.Normal);

	const forename = name.split(" ")[0];
	const lastname = name.split(" ")[1];

	const selectClasses = getClasses();

	const [showError,setShowError] = useState(false);

	const [signState,setSignState] = useState(SignState.First);

	const {setUser, setRefreshToken, setAccessToken} = useContext(UserContext);

	const error = (state:SignState) => {
		setShowError(true);
		setSignState(state);
	}

	const signUp = async () => {
		if(name.split(" ").length !== 2) {error(SignState.First);return;}
		if(!email.includes("@")) {error(SignState.First);return;}
		if(phone.length < 5 ) {error(SignState.First);return;}
		if(selectedClass.length !== 5) {error(SignState.First);return;}
		if(password[0] !== password[1]) {error(SignState.Seccond);return;}
		if(forename === "") {error(SignState.First);return;}
		if(lastname === "") {error(SignState.First);return;}

		setSignState(SignState.Loading);

		const {user, refreshToken, accessToken} = await SignUpUser({
			email,
			forename,
			lastname,
			password:password[0],
			phone,
			type:KillerTypeToNumber(playerType),
			year:GetYearFromClass(selectedClass),
			group:selectedClass
		});

		setUser(user);
		setRefreshToken(refreshToken);
		setAccessToken(accessToken);
		setState(State.Wait);
	}

	if(signState == SignState.First || signState === SignState.Confirm)
	{
		return (
			<div>
				<Typography sx={classes.title} variant="h1" color="primary" align="center">Killer</Typography>
				<Container sx={classes.margin}>
					<StyledTextField 
						text={name}
						setText={s=>setName(s)}
						placeHolder="Förnamn Efternamn"
						helper="Per-Olof Andersson Lundqvist"
						label="Namn"
					/>
					<StyledTextField 
						text={email}
						setText={s=>setEmail(s)}
						placeHolder="nnnnåå@nykopingsenskilda.se"
						label="Email"
						helper=""
					/>
					<StyledTextField 
						text={phone}
						setText={s=>setPhone(s)}
						placeHolder="+46 70 545 3110"
						label="Telefonnummer"
						helper=""
					/>
					<div style={{marginTop:"7%",width:"1px",height:"1px"}} />
					<TextField 
						variant="outlined"
						placeholder={"Välj klass"}
						value={selectedClass}
						color='primary'
						label="Klass"
						required
						select
						onChange={(e)=>setClass(e.target.value)}
						InputLabelProps={{shrink:true}}
						InputProps={{sx:{color:"#ecf0f1"}}}
						sx={{width:"60%","& .MuiInputLabel-root": {color: '#ecf0f1'},//styles the label
							"& .MuiOutlinedInput-root": {
								"& > fieldset": { borderColor: "#ecf0f1" },
								"& .MuiSvgIcon-root": { color: "#ecf0f1" },
						}}}
					>
						{selectClasses.map((item,index)=>{
							return (
								<MenuItem key={index} value={item}>
									{item}
								</MenuItem>
							)
						})}
						
					</TextField>
				</Container>
				<Container sx={classes.center}>
					<Button 
						sx={classes.nextBtn} 
						variant="contained" 
						color="primary"
						onClick={()=>setSignState(SignState.Confirm)}
					>
						Nästa
					</Button>
				</Container>
				<Dialog
					PaperProps={{style:{backgroundColor:"#1B2430"}}}
					open={signState === SignState.Confirm}
					onClose={()=>setSignState(SignState.First)}
				>
					<DialogTitle>Stämmer Det?</DialogTitle>
					<DialogContent>
						<Typography variant="body2" component="p">Förnamn</Typography>
						<Container sx={classes.bubble}><Typography variant="body1" component="p" sx={{color:"#fff"}}>{forename}</Typography></Container>
						<Typography variant="body2" component="p">Efternamn</Typography>
						<Container sx={classes.bubble}><Typography variant="body1" component="p" sx={{color:"#fff"}}>{lastname}</Typography></Container>
						<Typography variant="body2" component="p">Email</Typography>
						<Container sx={classes.bubble}><Typography variant="body1" component="p" sx={{color:"#fff"}}>{email}</Typography></Container>
						<Typography variant="body2" component="p">Telefonnumer</Typography>
						<Container sx={classes.bubble}><Typography variant="body1" component="p" sx={{color:"#fff"}}>{phone}</Typography></Container>
						<Typography variant="body2" component="p">Klass</Typography>
						<Container sx={classes.bubble}><Typography variant="body1" component="p" sx={{color:"#fff"}}>{selectedClass}</Typography></Container>
						<Container sx={classes.dialogBtns}>
							<Button variant="contained" onClick={()=>setSignState(SignState.First)}>NEJ</Button>
							<Button variant="contained" onClick={()=>setSignState(SignState.Seccond)}>JA</Button>
						</Container>
					</DialogContent>
				</Dialog>
				<TimeoutAlert time={3000} title="Error" text="Något med din information är fel" show={showError} setShow={s=>setShowError(s)}/>
			</div>
		)
	}

	const getStars = (password:string) => {
		const length = password.length;
		var output = ""
		for(var i = 0; i < length; i ++)
		{
			output += "*"
		}
		return output;
	}

	if(signState === SignState.Seccond)
	{
		return(
			<div>
				<Typography sx={classes.title} variant="h1" color="primary" align="center">Killer</Typography>
				<Container sx={classes.margin}>
					<StyledTextField 
						text={password[0]}
						setText={s=>setPassword(old=>[s,old[1]])}
						placeHolder=""
						helper=""
						label="Lösenord"
					/>
					<StyledTextField
						error={password[0] !== password[1]}
						text={password[1]}
						setText={s=>setPassword(old =>[old[0],s])}
						placeHolder=""
						helper={password[0] === password[1] ? "" : "Lösenord stämmer inte överens"}
						label="Repetera Lösenord"
					/>
					<FormControl color='primary'>
						<Typography sx={{fontSize:"2rem",fontWeight:"700",marginTop:"1rem"}} color="primary">Vem är du?</Typography>
						<RadioGroup
							value={KillerTypeToNumber(playerType)}
							onChange={(e)=>setPlayerType(NumberToKillerType(parseInt(e.target.value)))}
						>
							<FormControlLabel value={0} control={<Radio />} label={"Normal - Med för att det är roligt"} componentsProps={{typography:{color:"#ecf0f1"}}}/>
							<FormControlLabel value={1} control={<Radio />} label={"Hardcore - All in på att döda"} componentsProps={{typography:{color:"#ecf0f1"}}}/>
							<FormControlLabel value={2} control={<Radio />} label={"Camper - All in på att överleva"} componentsProps={{typography:{color:"#ecf0f1"}}}/>
							<FormControlLabel value={3} control={<Radio />} label={"Osynlic - Osynlig - Gör inget"} componentsProps={{typography:{color:"#ecf0f1"}}}/>
						</RadioGroup>
					</FormControl>
				</Container>
				<Container sx={classes.center}>
					<Button 
						sx={classes.redoBtn} 
						variant="contained" 
						color="primary"
						onClick={()=>signUp()}
					>
						Redo?
					</Button>
				</Container>
				<TimeoutAlert time={3000} title="Error" text="Något med din information är fel" show={showError} setShow={s=>setShowError(s)}/>
			</div>
		)
	}

	if(signState === SignState.Loading)
	{
		return(
			<Container sx={classes.loadingContainer}>
				<CircularProgress color="primary" size="4rem" thickness={6}/>
				<TimeoutAlert time={3000} title="Error" text="Något med din information är fel" show={showError} setShow={s=>setShowError(s)}/>
			</Container>
		)
	}

	return<></>
}

function KillerTypeToNumber(type:KillerType)
{
	switch(type)
	{
		case KillerType.Normal:
			return 0;
		case KillerType.Hardcore:
			return 1;
		case KillerType.Camper:
			return 2;
		case KillerType.Osynlig:
			return 3;
	}
}

function NumberToKillerType(nmb:Number)
{
	switch(nmb)
	{
		case 0:
			return KillerType.Normal;
		case 1:
			return KillerType.Hardcore;
		case 2:
			return KillerType.Camper;
		case 3:
			return KillerType.Osynlig;
		default:
			return KillerType.Normal;
	}
}

export default Signup