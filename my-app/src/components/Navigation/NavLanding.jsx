import React from 'react';
import { NavLink } from 'react-router-dom'

const NavLanding = props => {
	return (
		<div className="navbar">
			<div className="nav-content">
				<div className="nav-logo">Quote of The Day</div>

				<div className="nav-links">
                <div>
					<NavLink exact to="/login"
                        className="nav-link"
                        activeClassName="nav-link-active">Login
                     
                    </NavLink>
                    </div>
                    <div>
                    <NavLink to="/signup"
                        className="nav-link"
                        activeClassName="nav-link-active">Signup
                    </NavLink>
                    </div>
				</div>
			</div>
		</div>
	);
};

export default NavLanding;