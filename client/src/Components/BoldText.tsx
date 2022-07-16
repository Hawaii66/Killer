import { Typography } from '@mui/material'
import React from 'react'
import { theme } from '../ThemeProvider'

interface Props
{
	children:React.ReactNode
}

function BoldText({children}:Props){
	return(
		<b style={{
			color:`#ccc`
		}}>{children}</b>
	)
}

export default BoldText;