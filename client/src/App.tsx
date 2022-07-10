import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';

import "./app.css";
import { UserContext } from './Contexts/UserContext';
import { User, DefaultUser, KillerType } from './Interfaces/User';
import RouteWrapper from './Routes/RouteWrapper';
import { theme } from './ThemeProvider';

function App() {
	const [user,_setUser] = useState<User>({
		alive:true,
		email:"hawaiilive@outlook.com",
		forename:"Sebastian",
		group:"Na21B",
		hitman:"",
		id:"id",
		kills:0,
		lastname:"Ahlman",
		password:"HASHED",
		phone:"+46 70 545 3110",
		target:"",
		type:KillerType.Normal,
		year:2
	});

	const setUser = (user:User) => _setUser(user);

	return (
		<ThemeProvider theme={theme}>
			<UserContext.Provider value={{
				setUser,
				user
			}}>
				<RouteWrapper />
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default App;
