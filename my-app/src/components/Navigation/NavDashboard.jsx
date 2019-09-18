import React from 'react';
import { NavLink } from 'react-router-dom'
import { axiosWithAuth } from '../../utils/axiosWithAuth';
import axios from 'axios'


const NavDashboard = props => {

    console.log(props)

    const handleClick = (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        axiosWithAuth()
            .get('http://localhost:4000/api/users/logout')
                .then(res => {
                    console.log(res)
                    window.localStorage.removeItem('token');
                    window.localStorage.removeItem('user');
                    window.localStorage.removeItem('user_id');
                    props.history.push('/login')


                })
                .catch(e => {
                    console.log(e)
                })
    }

	return (
		<div className="navbar">
			<div className="nav-content">
				<div className="nav-logo">Quote of The Day</div>

				<div className="nav-links">
                <div>
					<NavLink to="/login"
                        className="nav-link"
                        activeClassName="nav-link-active"
                        onClick={handleClick}>
                        Logout
                     
                    </NavLink>
                    </div>
                    <div>
                    <NavLink to="#"
                        className="nav-link"
                        activeClassName="nav-link-active">Profile
                    </NavLink>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default NavDashboard;