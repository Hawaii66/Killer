import { Container, SpeedDial, SpeedDialAction, SpeedDialIcon, Badge, Avatar, SxProps, Typography, Button, ButtonGroup, IconButton, SvgIcon, Skeleton } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'
import { SocketContext } from '../Contexts/SocketContext'
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import GavelIcon from '@mui/icons-material/Gavel';
import AssessmentIcon from '@mui/icons-material/Assessment';
import InfoIcon from '@mui/icons-material/Info';
import TargetIcon from '../Svg/Icons/TargetIcon';
import UnknownIcon from '../Svg/Icons/UnknownIcon';
import ProfileMenu from './Home/Profile/ProfileMenu';
import SchoolIcon from '@mui/icons-material/School';
import DeathModal from '../Components/DeathModal';

const classes:{[key:string]:SxProps} = {
	center:{
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"column"
	},
	header:{
		paddingTop:"4rem",
		marginBottom:"1rem"
	},
	alive:{
		marginBottom:"1rem"
	},
	quickMenu:{
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"column",
		marginTop:"4rem"
	},
	actionbuttons:{
		display:"flex",
		justifyContent:"center",
		alignItems:"center",
		flexDirection:"column",
		marginTop:"4rem"
	},
	actionButton:{
		marginTop:"0.5rem",
		width:"15rem",
		height:"4rem",
	}
}

export enum HomeRoutes
{
	Home,
	Stats,
	Rules,
	Information,
	Settings,
	Elev,
	Profile,
}

const menuActions = [
	{ icon: <HomeIcon />, name: 'Hem' },
	{ icon: <AssessmentIcon />, name: 'Statistik' },
	{ icon: <GavelIcon />, name: 'Regler' },
	{ icon: <InfoIcon />, name: 'Information' },
	{ icon: <SchoolIcon />, name:"Elevkåren" },
	{ icon: <SettingsIcon />, name: 'Inställningar' },
];

interface Props
{
	mode:HomeRoutes
	setMode:(mode:HomeRoutes)=>void
}

function Home({mode,setMode}:Props) {
	const [showMenu, setShowMenu] = useState(false);
	const [showUserProfile, setShowUserProfile] = useState(false);
	const [showDeath, setShowDeath] = useState(0);
	//0 = dont show
	//1 = I died
	//-1 = I murdered

	const {user} = useContext(UserContext);
	const {alive,total} = useContext(SocketContext);
	
	const navigate = useNavigate();

	useEffect(()=>{
		if(user.id === "")
		{
			navigate("/login");
		}
	},[user]);

	const menuClicked = (index:number) => {
		switch(index)
		{
			case 0:
				setMode(HomeRoutes.Home);
				navigate("/")
				break;
			case 1:
				setMode(HomeRoutes.Stats);
				navigate("/home/stats")
				break;
			case 2:
				setMode(HomeRoutes.Rules);
				navigate("/home/rules")
				break;
			case 3:
				setMode(HomeRoutes.Information);
				navigate("/home/information")
				break;
			case 4:
				setMode(HomeRoutes.Elev);
				navigate("/home/elev");
				break;
			case 5:
				setMode(HomeRoutes.Settings);
				navigate("/home/settings")
				break;
		}
		setShowMenu(false);
	}

	return (
		<div>
			<Container sx={classes.center}>
				<Typography sx={classes.header} align="center" color="primary" variant="h1">Killer</Typography>
				<Typography sx={classes.alive} align="center" color="secondary" variant="h3">{(alive === 0 && total === 0) ? <Skeleton variant="text"/> : `${alive} / ${total}`}</Typography>

				<Button 
					sx={{
						position:"absolute",
						top:8,
						left:8,
					}} 
					disableRipple
					onClick={()=>setShowUserProfile(true)}
				>
					<Badge 
						badgeContent={""} 
						color="primary"
						overlap="circular" 
						anchorOrigin={{
							vertical:"bottom",
							horizontal:"right"
						}}
					>
						<Avatar
							sx={{
							width:48,
							height:48,
							}}
						>
							<Typography color="#243558" variant="h5" fontWeight={700}>{user.forename[0] + user.lastname[0]}</Typography>
						</Avatar>
					</Badge>
				</Button>
				<ProfileMenu show={showUserProfile} setShow={(s)=>setShowUserProfile(s)}/>

				<SpeedDial
					ariaLabel='Menu'
					sx={{ position: 'absolute', top: 16, right: 16 }}
					icon={<SpeedDialIcon />}
					onClose={()=>setShowMenu(false)}
					onOpen={()=>setShowMenu(true)}
					open={showMenu}
					direction="down"
				>
					{menuActions.map((action,index) => (
						<SpeedDialAction
							key={action.name}
							icon={action.icon}
							title={action.name}
							onClick={(_)=>{
								menuClicked(index);
							}}
							FabProps={{
								sx:{
									backgroundColor:"#555862"
								},
							}}
						/>
					))}
				</SpeedDial>

				<Container sx={classes.quickMenu}>
					<ButtonGroup color="info" variant="contained" size="large" aria-label="text button group">
						<Button color="info">
							<TargetIcon />
						</Button>
						<Button color="info">
							<AssessmentIcon />
						</Button>
						<Button color="info">
							<UnknownIcon />
						</Button>
					</ButtonGroup>
				</Container>
				<DeathModal 
					setShow={(_)=>setShowDeath(0)}
					show={showDeath !== 0}
					userDied={showDeath == 1 ? true : false}
				/>

				<Container sx={classes.actionbuttons}>
					<ButtonGroup orientation="vertical" variant="contained" color="primary" aria-label="medium secondary button group">
						<Button onClick={()=>setShowDeath(-1)} sx={classes.actionButton}>Jag Mördade</Button>
						<Button onClick={()=>setShowDeath(1)} sx={classes.actionButton}>Jag Dog</Button>
					</ButtonGroup>
				</Container>
			</Container>
		</div>
	)
}
export default Home