import React, { useContext, useState } from 'react'
import { UserContext } from '../Contexts/UserContext'
import Login from './WaitForStart/Login/Login';
import Signup from './WaitForStart/Signup/Signup';
import WaitHome from './WaitForStart/WaitHome';

export enum State{
	Wait,
	Signup,
	Login
}

function WiatForStart() {
	const [state, setState] = useState<State>(State.Wait);

	const {user} = useContext(UserContext);

	if(state === State.Wait) return <WaitHome setState={(s)=>setState(s)} />
	if(state === State.Login) return <Login setState={(s)=>setState(s)} />
	if(state === State.Signup) return <Signup setState={(s)=>setState(s)} />

	setState(State.Wait);
	return <></>
}

export default WiatForStart