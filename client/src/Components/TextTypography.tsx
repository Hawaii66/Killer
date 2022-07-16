import { Typography } from '@mui/material'
import React from 'react'
import { theme } from '../ThemeProvider'

interface Props
{
	children:React.ReactNode
}

function TextTypography({children}:Props) {
	return(
		<Typography align="left" variant="body2" color={theme.palette.text.primary} sx={{fontSize:"1rem"}}>
			{children}
			<br/>
			<br/>
		</Typography>
	)
}

export default TextTypography