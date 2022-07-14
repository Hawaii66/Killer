import { Accordion, AccordionSummary, Typography, AccordionDetails } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {theme} from "./../../../ThemeProvider";

interface Props
{
	expanded:boolean,
	setExpanded:(state:boolean)=>void,
	text:React.ReactNode,
	summary:string
}

function Rule({expanded, setExpanded, text, summary}:Props) {
	return (
		<Accordion
			sx={{backgroundColor:theme.palette.info.main}}
		expanded={expanded} onChange={()=>setExpanded(!expanded)}>
			<AccordionSummary
				expandIcon={<ExpandMoreIcon />}
				aria-controls="panel1bh-content"
				id="panel1bh-header"
			>
				<Typography 
					variant="body1"
					color={theme.palette.text.primary}
					sx={{ width: '80%', flexShrink: 0 }}
				>
					{summary}
				</Typography>
			</AccordionSummary>
			<AccordionDetails>
				<Typography
					variant="body2"
					color={theme.palette.text.primary}
				>
					{text}
				</Typography>
			</AccordionDetails>
		</Accordion>
	)
}

export default Rule