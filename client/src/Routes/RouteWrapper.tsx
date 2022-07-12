import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Home'
import WiatForStart from './WiatForStart'

function RouteWrapper() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}/>
				<Route path="/wait" element={<WiatForStart/>} />
				<Route path="*" element={<Home />} />
			</Routes>
		</BrowserRouter>
	)
}

export default RouteWrapper