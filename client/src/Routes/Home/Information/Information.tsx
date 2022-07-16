import { Container, IconButton, Typography } from '@mui/material'
import React from 'react'
import CancelIcon from "@mui/icons-material/Cancel"
import { theme } from '../../../ThemeProvider'
import { useNavigate } from 'react-router-dom'
import TextTypography from '../../../Components/TextTypography'
import BoldText from '../../../Components/BoldText'
import LinkText from '../../../Components/LinkText'

function Information() {
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
				Information
			</Typography>
			</div>
			<Container>
				<TextTypography>
					Spelet går ut på att döda ditt specifika offer och ej bli dödad av den som ska döda dig. När du dödat ditt offer får du offrets offer och kan fortsätta din räd mot finalen. 
				</TextTypography>
				<TextTypography>
					<BoldText>Ditt offer:</BoldText> Du blir tilldelad ditt första offer via denna hemsida vid starten av Killer. Därefter får du ditt offers offer och så vidare.
					<br/>
					Exempel: Om A dödar B (och B skulle ha dödat C) kommer A's nya offer bli C
				</TextTypography>
				<TextTypography>
					<BoldText>Hur man utför ett mord:</BoldText> Du dödar dit toffer genom att gå fram till offret och säga "Du är död" samtidigt som du vidrör offret på axeln. Vittnesmål inom 5 sekunder eller användande av "Dagens Skydd" ogiltliggör mordet. Offret måste höra dödförklaringen (förutsatt att offret inte använder medel för att nedsätta hörseln, exempelvis med hörlurar eller hörselskydd).
				</TextTypography>
				<TextTypography>
					<BoldText>Hur man vittnar:</BoldText> När man har sett ett mord äga rum har man ett val att vittna som åskådare. Detta gör man genom att säga "Jag vittnar". Vittnesmålet ogiltiggör mordet och offret är räddat. Vittnesmålet måste ske inom 5 sekunder efter att mordet har skett för att vara giltigt. Offret får ALDRIG be om vittnesmål efter att mordet begåtts. Ber man på något sätt om vittnesmål ogiltiggör man alla eventuella vittnesmål. Vittnesmålet måste höras av mördaren (förutsatt att mördaren inte använder medel för att nedsätta hörseln, exempelvis med hörlurar eller hörselskydd).
				</TextTypography>
				<TextTypography>
					<BoldText>När du har begåt ett mord:</BoldText> När du begått ett lyckat mord går du in på denna hemsida och loggar in. Klicka sedan på knappen "JAG MÖRDADE". Skriv in ditt lösenord och ditt offers 4 siffriga PIN kod.
				</TextTypography>
				<TextTypography>
					<BoldText>När du har blivit dödad:</BoldText> När du blivit dödad ska du in på denna hemsida och logga in. Klicka sedan på knappen "JAG DOG". Skriv in ditt lösenord och ditt offers 4 siffriga PIN kod.
				</TextTypography>
				<TextTypography>
					<BoldText>Dagens Vapen:</BoldText> Dagens Vapen förekommer vissa dagar under spelets gång. Med vapnet kan man döda sitt offer oavsett vittnesmål eller ej. Vapnet kan förekomma i en rad olika former. För att minimera risken att folk stannar hemma kan vapen komma att avslöjas samma dag som det gäller eller i form av så kallat flashvapen. Kolla hemsidan för information om dagens information
				</TextTypography>
				<TextTypography>
					<BoldText>Dagens Skydd:</BoldText> Dagens Skydd har samma koncept som vapnet men de två fyller olika funktioner. I stället för att kunna döda ditt offer oavsett vittnesmål så kan man med skyddet överleva mordförsök utan vittnesmål. Finns det både skydd och vapen samma dag är det skyddet som står över vapnet.  
				</TextTypography>
				<TextTypography>
					<BoldText>Dagens Vittnesbevis:</BoldText> Dagens Vittnesbevis förekommer vissa dagar och innebär att man behöver ha ett specifikt föremål för att kunna bevittna ett mord. Medans ett vittnesbevis är aktivt så innebär det att vanliga vittnesmål inte fungerar som ett sätt att stoppa ett mord.
				</TextTypography>
				<TextTypography>
					Gemensamt för både vapen och skydd är att de måste vara synliga vid användning och om det förekommer speciella instruktioner för hur de ska bäras är det viktigt att instruktionerna följs för att vapnet/skyddet ska vara giltigt.
				</TextTypography>
				<TextTypography>
					Vapen, Skydd och Vittnesbevis annonseras på <LinkText to="https://www.instagram.com/enskildakaren/">Enskilda Kårens Instagram</LinkText> eller denna hemsida. För att minimera risken att folk stannar hemma kan skydd komma att avslöjas samma dag som det gäller eller i form av så kallat flashvapen.
				</TextTypography>
				<TextTypography>
					Löpande information under spelets gång hittar man här på hemsidan, däribland uppdateringar av regler och diverse statistik.
				</TextTypography>
				<TextTypography><BoldText>Kreativitet och mål</BoldText></TextTypography>
				<TextTypography>
					Vissa är med i KILLER för att ha kul, andra för att vinna. För att lyckas så bra som möjligt är det viktigt att tänka utanför boxen. Det är tillåtet och uppmuntras att använda sig av nya metoder för att hitta och döda sina offer, så länge de inte bryter mot reglerna. Lycka till!
				</TextTypography>
			</Container>
		</div>
	)
}

export default Information