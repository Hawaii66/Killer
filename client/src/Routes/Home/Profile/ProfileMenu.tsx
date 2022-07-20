import { ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box, List, Drawer } from '@mui/material'
import React, { useContext } from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../Contexts/UserContext';
import { DefaultUser } from '../../../Interfaces/User';
import {theme} from "./../../../ThemeProvider";

const ProfileMenuButton = ({text,icon, onClick}:Button) => {
	return(
		<ListItem disablePadding>
			<ListItemButton onClick={(e)=>onClick()}>
				<ListItemIcon>
					{icon}
				</ListItemIcon>
				<ListItemText primary={text}  sx={{
					color:theme.palette.text.primary
				}}/>
			</ListItemButton>
		</ListItem>
	)
}

const ProfileMenuDivide = ({padding}:Divide) => {
	if(padding)
	{
		return <Divider sx={{marginTop:"1rem",marginBottom:"1rem"}}/>
	}
	return <Divider />
}

const ProfileMenuText = ({text}:Text) => {
	return(
		<ListItem disablePadding sx={{
			marginTop:"0.5rem",
			marginLeft:"1rem"
		}}>
			<ListItemText primary={text} sx={{
					color:theme.palette.text.primary
				}} />
		</ListItem>
	)
}

enum MenuType
{
	Divide,
	Button,
	Text
}

type Divide = {
	padding:boolean,
	type:MenuType.Divide,
	showIfAlive:boolean
}

type Button = {
	text:string,
	icon:React.ReactNode,
	type:MenuType.Button,
	onClick:()=>void,
	showIfAlive:boolean
}

type Text = {
	text:string,
	type:MenuType.Text,
	showIfAlive:boolean
}

type MenuItem = Divide | Button | Text;

interface Props{
	show:boolean,
	setShow:(s:boolean)=>void
}

function ProfileMenu({show,setShow}:Props)
{
	const {user, setUser} = useContext(UserContext);
	
	const menuItems:MenuItem[] = [
		{
			text:"Stäng",
			icon:<CloseIcon color="primary"/>,
			type:MenuType.Button,
			onClick:()=>{},
			showIfAlive:false
		},
		{
			text:"Logga Ut",
			icon:<LogoutIcon color="primary" />,
			type:MenuType.Button,
			onClick:()=>{},
			showIfAlive:false
		},
		{
			text:"Ändra",
			icon:<EditIcon color="primary" />,
			type:MenuType.Button,
			onClick:()=>{},
			showIfAlive:false
		},
		{
			padding:true,
			type:MenuType.Divide,
			showIfAlive:false
		},
		{
			text:`PIN kod: ${user.pin}`,
			type:MenuType.Text,
			showIfAlive:true
		},
		{
			text:`Kills: ${user.kills}`,
			type:MenuType.Text,
			showIfAlive:false
		},
		{
			padding:true,
			type:MenuType.Divide,
			showIfAlive:false
		},
		{
			text:"@HawaiiDev",
			type:MenuType.Text,
			showIfAlive:false
		},
		{
			text:"hawaiilive@outlook.com",
			type:MenuType.Text,
			showIfAlive:false
		}
	];

	const navigate = useNavigate();
	
	const iconClicked = (index:number) => {
		switch(index)
		{
			case 0:
				setShow(false);
				break;
			case 1:
				localStorage.clear();
				setUser(DefaultUser);
				setShow(false);
				navigate("/");
				break;
			case 2:
				alert("Denna meny är inte klar ännu!");
				setShow(false);
				break;
			default:
				alert("Nu gjorde du något dumt!");
				setShow(false);
				break;
		}
	}

	return (
		<Drawer
            anchor={"left"}
            open={show}
            onClose={()=>setShow(false)}
			PaperProps={{
				sx:{
					backgroundColor:`#${theme.palette.background.default}`
				}
			}}
		>
			<Box
				role="presentation"
				sx={{
					minWidth:290
				}}
				>
				<List>
					{menuItems.map((item,index)=>{
						if(!user.alive && item.showIfAlive) return <></>;

						if(item.type === MenuType.Button) return <ProfileMenuButton showIfAlive={false} onClick={()=>iconClicked(index)} key={index} text={item.text} icon={item.icon} type={MenuType.Button} />
						if(item.type === MenuType.Text) return <ProfileMenuText showIfAlive={false} key={index} text={item.text} type={MenuType.Text} />
						if(item.type === MenuType.Divide) return <ProfileMenuDivide showIfAlive={false} key={index} padding={item.padding} type={MenuType.Divide} />
					})}
				</List>
			</Box>
		</Drawer>
	)
}

export default ProfileMenu