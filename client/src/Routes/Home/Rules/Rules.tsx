import { IconButton } from '@mui/material';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Rule from './Rule';
import CancelIcon from '@mui/icons-material/Cancel';

type Rule = {
	text:React.ReactNode,
	summary:string
}

const TextRules:Rule[] = [
	{
		summary:"Blockad av väg till lektionssal är förbjuden om det hindrar eleven från att komma i tid till sin lektion",
		text:<>
			En blockad är när en mördare med vapen hindrar offret från att komma till sin lektion genom att stå framför lektionsalsdörren.
			Offret måste alltid kunna bevisa med schema att denne har lektion.
		</>
	},{
		summary:"Inga mord får begås under lektionstid, oavsett var offret befinner sig",
		text:<>
			Offret måste alltid kunna bevisa med schema att denne har lektion.
			<br/>
			<br/>
			<i>Undantag: Schemabrytande lektionstid måste kunna strykas av lärare.</i>
			<br/>
			<br/>
			<i>Avslutar läraren lektionen tidigare än vad schemat säger så är det inte längre lektion och man kan då bli dödad. (På resurstiden är skolbyggnaden alltid killerfri fram till 16.00)</i>
		</>
	},{
		summary:"Inga mord får begås i matsalen eller lärarens arbetsrum",
		text:<>
			Matsalen, arbetsrum, grupprum med lås och toaletter får dock inte användas som tillflyktszon.
		</>
	},{
		summary:"Våld får inte användas för att nå sitt offer eller för att hindra en mördare",
		text:<></>
	},{
		summary:"Under Resurstiden gills hela skolbyggnaden som en lektionssal",
		text:<>
			På onsdagar klocka 13.45 - 16.00 är det med andra ord killerfritt inne på skolan.
		</>
	},{
		summary:"Alla mord ska registreras hos oss av både mördare och offer",
		text:<>
			Detta görs via mail där man skriver: "Namn och klass" dödade "Namn och klass"
		</>
	},{
		summary:"Man får absolut inte byta offer med någon då detta skulle förstöra cirkeln",
		text:<>
			Man får heller inte döda någon annan än sitt tilldelade offer
			<br/>
			<br/>
			Bryter man mot någon av dessa regler förstör man för alla andra deltagare
		</>
	},{
		summary:"Mord får bara begås mellan 7.00 - 20.00",
		text:<>
		</>
	},{
		summary:"Mord får inte begås hemma hos offret",
		text:<>
			Mord får heller inte göras på hemmets tillhörande område som bestäms enligt nedan:
			<br/>
			<br/>
			Villor och radhus är tillhörande tomt killerfri.
			<br/>
			Lägenheter är trappuppgång(ar) killerfria.
		</>
	},{
		summary:"Man får endast försöka döda sitt offer en gång varje minut",
		text:<>
		</>
	},{
		summary:"Vid tvistemål som ej kan avgöras kommer ett slumpmässigt beslut tas",
		text:<>
			Detta gör vi efter att noga gått igenom de enskilda fallen och endast om det är absolut nödvändigt för att spelet ska kunna fortgå.
			<br/>
			<br/>
			Det slumpmässiga valet ska göras genom att singla en slant
		</>
	},{
		summary:"Matcher, Träningar, Körlektioner och annat som kräver stor koncentration är killerfria under tiden de pågår",
		text:<>
			Du kan dock bli mördad på väg till en träning eller när du precis slutat.
		</>
	},{
		summary:"Arbetstid",
		text:<>
			Under arbetstid kan man varken bli dödad eller döda.
			<br/>
			<br/>
			Offret måste alltid kunna bevisa att han/hon faktiskt jobbar.
		</>
	},{
		summary:"Luciaträningen",
		text:<>	
			När du är med och tränar inför Lucia räknas det som en vanlig lektion.
		</>
	},{
		summary:"Flyktvägar",
		text:<>
			Det är inte tillåtet att använda fönster eller nödutgångar som flyktväg. Tillämpas någon av dessa som flyktväg kommer personen i fråga bli diskad direkt.
		</>
	},{
		summary:"Olämpligt uppträdande",
		text:<>
			Det är förbjudet att sätta sig själv eller andra i fara eller hota andra deltagare på något sätt. Brytande mot denna regel kommer resultera i en omedelbar diskning.
		</>
	},{
		summary:"Frånvaro",
		text:<>
			Självklart måste man vara hemma om man känner sig sjuk, men frånvaro kommer kontrolleras.
			<br/>
			<br/>
			Om man är borta mer än fyra skoldagar i sträck eller på annat sätt har en återkommande frånvaro utan att kunna styrka sin sjukdom diskas man automatiskt. Vi kommer bli betydligt hårdare på detta under skydd- och vapendagar samt senare i Killer.
		</>
	},{
		summary:"Studentpoäng",
		text:<>
			<i>Preliminärt, kan komma att ändras</i>¨
			<br/>
			<br/>
			Studentpoängen i år kommer delas ut enligt följande:
			<br/>
			<br/>
			Till de tre klasser i trean som har högst procentuellt antal levande av det totala antalet medlemmar i klassen den 29 november 23:59. Antalet levande i procent ges av formeln: 100*Antal levande / Antal i klassen. Notera att antal i klassen inte gäller antal anmälda, utan antalet i din klass totalt. Om din klass har 30 elever och 6 levande betyder det alltså 20 procent av din klass lever.
			<br/>
			Till de tre klasser i trean som har flest kills per person i klassen den 29 november 23:59. Kills per person i klassen bestäms enligt följande: Antal kills av klassen / Antal i klassen. Notera att antal i klassen inte gäller antal anmälda, utan antalet i din klass totalt. Om din klass har 28 elever och 30 kills så har klassen jämförelsetalet 30/26 = ~1.11.
		</>
	},{
		summary:"Automatisk diskning och ändring av cirkeln",
		text:<>
			Beroende på hur många som lever när KILLER börjar närma sig sitt sluskede, kan eventuellt filter komma att tillämpas. Ett exempel på ett sådant filter kan vara att alla som dödat färre än x person(er) åker ut ett visst datum.
			<br/>
			<br/>
			Om det bedöms möjligt att Killer kommer bli klart för tidigt, eller liknande misstanke, kan cirkeln komma att göras om för att förlänga spelets gång.
		</>
	},{
		summary:"KILLER-ansvariga har alltid sista ordet i eventuella tvister.",
		text:<></>
	},{
		summary:"Kontakt:",
		text:<>
			Eventuella frågor tas upp med oss via mail (<Link to={"#"} onClick={()=>window.location.href="mailto:enskildakiller@gmail.com"}>enskildakiller@gmail.com</Link>) alternativt Instagram (@enskildakaren).
			<br/>
			<br/>
			Årets KILLER-ansvariga är Elvin (NA19B), Selma (SA19B), Edwin (EK19A) och Alva (NA19A).
		</>
	}
]

function Rules() {
	const [openRule, setOpenRule] = useState(-1);

	const navigate = useNavigate();

	return (
		<div style={{
			display:"flex",
			flexDirection:"column",
			alignItems:"center",
			maxWidth:"100vw"
		}}>
			<div
				style={{
					display:"flex",
					justifyContent:"flex-start",
					width:"100%",
					marginLeft:"1rem",
					marginTop:"1rem"
				}}
			>
				<IconButton size='large' onClick={()=>navigate("/")}>
					<CancelIcon />
				</IconButton>
			</div>
			<div style={{
				marginLeft:"2rem",
				marginRight:"2rem"
			}}>
				{TextRules.map((rule, index) => {
					return(
						<Rule 
							key={rule.summary}
							text={rule.text}
							summary={rule.summary}
							expanded={openRule === index}
							setExpanded={(s)=>{
								if(s)
								{
									setOpenRule(index);
								}else{
									setOpenRule(-1);
								}
							}}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Rules