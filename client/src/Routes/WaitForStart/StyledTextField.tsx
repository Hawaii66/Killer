import { TextField } from '@mui/material'
import React from 'react'

interface Props {
    text:string,
    setText:(s:string)=>void,
	placeHolder:string,
	helper:string,
	label:string,
	disabled?:boolean,
	error?:boolean
}

function StyledTextField({text,setText,placeHolder, helper,label, disabled,error}:Props) {
	return(
		<>
			<div style={{marginTop:"7%",width:"1px",height:"1px"}} />
			<TextField 
				error={error === undefined ? false : error}
				variant="outlined"
				placeholder={placeHolder}
				value={text}
				disabled={disabled === undefined ? false : disabled}
				onChange={(e)=>setText(e.target.value)}
				color='primary'
				label={label}
				required
				helperText={helper}
				InputLabelProps={{shrink:true}}
				sx={{width:"85%"}}
			/>
		</>
	)
}

export default StyledTextField