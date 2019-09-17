import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { axiosWithAuth } from './utils/axiosWithAuth';
import Login from '../src/components/Login/Login';
import Signup from '../src/components/Signup/Signup';
import Landing from '../src/components/Landing/Landing';
import Dashboard from '../src/components/Dashboard/Dashboard'
import UserContext from './contexts/UserContext';


import './scss/index.scss';

function App() {

  const [ user, setUser ] = useState(() => (localStorage.user ? JSON.parse(localStorage.user) : null));

  useEffect(
		() => {
			user && localStorage.setItem('user', JSON.stringify(user));
		},
		[ user ]
  );
  
  const getUser = currentUser => {
		setUser(currentUser);
	};

  return (
    <UserContext.Provider value={{ user, setUser, getUser}}>
    <div className="App">
  

        <Route exact path="/" component={Landing} />
        <Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />

        <PrivateRoute path="/protected/dashboard/:id" component={Dashboard} />

    </div>
    </UserContext.Provider>
  );
}

export default App;
