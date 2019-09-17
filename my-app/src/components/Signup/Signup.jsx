import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import UserContext from '../../contexts/UserContext';
import { axiosWithAuth } from '../../utils/axiosWithAuth';

const Signup = props => {
	const { getUser } = useContext(UserContext);

	const [ newUser, setNewUser ] = useState({
		username: '',
		password: '',
		lastName: '',
		firstName: '',
		email: '',
		address: '',
		phone: '',
		address: ''
	});

	const handleChange = e => {
		setNewUser({ ...newUser, [e.target.name]: e.target.value });
		console.log('handleChange', e.target.name, e.target.value, newUser);
	};

	const handleSubmit = e => {
		e.preventDefault();
		axiosWithAuth()
			.post('http://localhost:4000/api/auth/signup', newUser)
			.then(res => {
				console.log(res);
				localStorage.setItem('token', res.data.token);
				const id = res.data.id;
                props.history.push(`/protected/dashboard/${id}`);

			})
			.catch(err => console.log('error in signup', err));
	};

	useEffect(
		() => {
			getUser(newUser);
		},
		[ newUser ]
	);

	return (
		<>
		<div>
			<form onSubmit={handleSubmit}>
					<div className="signup-header">
						<h2>Sign Up</h2>
					</div>

					<div className="form-group">
						<input
							// style={{ width: '320px' }}
							type="username"
							name="username"
							className="form-group"
							placeholder="Username"
							onChange={handleChange}
							value={newUser.userName}
						/>
					</div>
					<div className="form-group">
						<input
							// style={{ width: '320px' }}
							type="firstName"
							name="firstName"
							className="form-group"
							placeholder="First Name"
							onChange={handleChange}
							value={newUser.firstName}
						/>
					</div>

					<div className="form-group">
						<input
							type="lastName"
							name="lastName"
							className="form-group"
							placeholder="Last Name"
							onChange={handleChange}
							value={newUser.lastName}
						/>
					</div>

					<div className="form-group">
						<input
							type="phone"
							name="phone"
							className="form-group"
							placeholder="Phone Number"
							onChange={handleChange}
							value={newUser.phone}
						/>
					</div>

					<div className="form-group">
						<input
							type="email"
							name="email"
							className="form-group"
							placeholder="email"
							onChange={handleChange}
							value={newUser.email}
						/>
					</div>
					<div className="form-group">
						<input
							type="password"
							name="password"
							className="form-group"
							placeholder="Password"
							onChange={handleChange}
							value={newUser.password}
						/>
					</div>
					<div className="form-group">
						<input
							type="address"
							name="address"
							className="form-group"
							placeholder="address"
							onChange={handleChange}
							value={newUser.address}
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