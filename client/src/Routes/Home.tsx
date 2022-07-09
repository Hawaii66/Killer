import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Contexts/UserContext'

function Home() {
	const {user} = useContext(UserContext);
	
	const navigate = useNavigate();

	useEffect(()=>{
		if(user.id === "")
		{
			navigate("/login");
		}
	},[user])

	return (
		<h1>HOME</h1>
	)
}

export default Home