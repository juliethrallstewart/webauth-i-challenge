import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import UserContext from '../../contexts/UserContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const Signup = props => {
	const { getUser } = useContext(UserContext);

	const [ user, setUser ] = useState({
		username: '',
		password: '',

	});
	

	const handleChange = e => {
		setUser({ ...user, [e.target.name]: e.target.value });
		console.log('handleChange', e.target.name, e.target.value, user);
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post('http://localhost:4000/api/auth/login', user)
			.then(res => {
				localStorage.setItem('token', res.data.token);
				console.log(res)
				localStorage.setItem('user_id', res.data.id);

				const id = res.data.id;
				(console.log(props.history))
				props.history.push(`/protected/dashboard/${id}`);

			})
			.catch(err => console.log('error in login', err));
	};

	useEffect(
		() => {
			getUser(user);
		},
		[ user ]
	);

	return (
		<>
		<div>
			<form onSubmit={handleSubmit}>
					<div className="signup-header">
						<h2>Login</h2>
					</div>

					<div className="form-group">
                        <input
                            // style={{ width: '320px' }}
                            type="username"
                            name="username"
                            className="form-group"
                            placeholder="Username"
                            onChange={handleChange}
                            value={user.userName}
                        />
							</div>
                            <div className="form-group">
						<input
							type="password"
							name="password"
							className="form-group"
							placeholder="Password"
							onChange={handleChange}
							value={user.password}
						/>
					</div>

						
					<button className="button">SUBMIT</button>
			
			</form>
		</div>
		{/* <Footer /> */}
		</>
	);
};

export default Signup;