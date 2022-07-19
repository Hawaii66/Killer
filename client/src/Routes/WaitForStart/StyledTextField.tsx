import { TextField } from '@mui/material'
import React from 'react'

interface Props {
    text:string,
    setText:(s:string)=>void,
	placeHolder:string,
	helper:string,
	label:string,
	disabled?:boolean,
	error?:boolean,
	width?:string
}

function StyledTextField({text,setText,placeHolder, helper,label, disabled,error,width}:Props) {
	const internalWidth = width === undefined ? "85%" : width;

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
				sx={{
					width:internalWidth,
					"& .MuiInputLabel-root": {
						color: '#ecf0f1'
					},//styles the label
					"& .MuiOutlinedInput-root": {
						"& > fieldset": { borderColor: "#ecf0f1" },
					},
					"&": {
						"& > p":{
							color:"#ecf0f1"
						}
					}
				}}
				InputProps={{sx:{color:"#ecf0f1"}}}
			/>
		</>
	)
}

export default StyledTextField