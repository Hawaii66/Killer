import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import Login from './Login'

function RouteWrapper() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="login" element={<Login/>} />
				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RouteWrapper