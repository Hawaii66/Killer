import React from 'react'
import { Link } from 'react-router-dom'

interface Props
{
	inside?:boolean,
	children:React.ReactNode,
	to:string
}

function LinkText({to, inside,children}:Props) {
	if(inside)
	{
		return <Link to={to}>{children}</Link>
	}
	
	return(
		<a  href={to} target="_blank" style={{
			color:"#ccc"
		}}>{children}</a>	
	)
}

export default LinkText