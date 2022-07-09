import { ThemeProvider } from '@emotion/react';
import React, { useState } from 'react';

import "./app.css";
import { UserContext } from './Contexts/UserContext';
import { User, DefaultUser } from './Interfaces/User';
import RouteWrapper from './Routes/RouteWrapper';
import { theme } from './ThemeProvider';

function App() {
	const [user,_setUser] = useState<User>(DefaultUser);

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
