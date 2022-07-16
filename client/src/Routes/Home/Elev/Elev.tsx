import { IconButton, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CancelIcon from "@mui/icons-material/Cancel";
import { theme } from '../../../ThemeProvider';
import LinkText from '../../../Components/LinkText';

function Elev() {
	const navigate = useNavigate();

	return(
		<div style={{
			display:"flex",
			flexDirection:"column",
			alignItems:"center",
		}}>
			<div
				style={{
					display:"flex",
					justifyContent:"flex-start",
					width:"100%",
					marginTop:"1rem",
					marginBottom:"0.5rem"
				}}
			>
				<IconButton sx={{width:"48px",height:"48px"}} onClick={()=>navigate("/")}>
					<CancelIcon fontSize='large'/>
				</IconButton>
				<Typography
				variant="h1"
				noWrap
				align="center"
				sx={{fontSize:"3.5rem",flexGrow:1}}
			>
				Elevkåren
			</Typography>
			</div>
			<div style={{
				padding:"2rem"
			}}>
				<Typography align="center" variant="h3" color={theme.palette.text.primary} sx={{fontSize:"1.5rem"}}>
					OBS!
				</Typography>
				<Typography align="center" variant="body2" color={theme.palette.text.primary} sx={{fontSize:"1rem"}}>
					Kom ihåg att du <b style={{fontWeight:"900"}}>måste vara medlem</b> i Enskildas Elevkår för att få medverka i KILLER. (Det är gratis)
				</Typography>
				<br/>
				<br/>
				<Typography align="center" variant="body2" color={theme.palette.text.primary} sx={{fontSize:"1rem"}}>
					Bli medlem i Enskildakåren: <LinkText to="https://ebas.gymnasiet.sverigeselevkarer.se/signups/index/351">Klicka Här</LinkText>
				</Typography>
				<Typography align="center" variant="body2" color={theme.palette.text.primary} sx={{fontSize:"1rem"}}>
					<br/>
					<br/>
					Enskildas Elevkår är en förening som vi elever på skolan har möjlighet att vara medlemmar i. Enskildakårens mål är att skapa en så rolig och bra skolgång som möjligt för alla elever på skolan och fixar därför en rad olika aktiviteter under läsårets gång.
					<br/>
					<br/>
					Som medlem behöver du inte göra någonting mer än att få vara en del av alla härligheter på skolan, tack vare att du och dina vänner är medlemmar i Enskildas elevkår har vi i styrelsen möjligheten och pengarna till att t.ex. köpa in priser till våra olika tävlingar. 
				</Typography>
			</div>
		</div>
	)
}

export default Elev