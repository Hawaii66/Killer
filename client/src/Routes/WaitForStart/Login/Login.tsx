import React from 'react'
import { State } from '../../WiatForStart'

interface Props {
    setState:(s:State) => void
}

function Login({setState}:Props) {
  return (
    <div>Login</div>
  )
}

export default Login