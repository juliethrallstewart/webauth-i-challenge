import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import UserContext from '../../contexts/UserContext';
// import { axiosWithAuth } from '../../utils/axiosWithAuth';

// axios.defaults.withCredentials = true;
// const axiosWithAuth = () => {
//   return axios.create({ withCredentials: true });
// };

const initialCreds = {
	username: "",
	password: ""
  };

const Signup = props => {
	const { getUser } = useContext(UserContext);

	const [ creds, setCreds ] = useState(initialCreds);
	

	const handleChange = e => {
		setCreds({ ...creds, [e.target.name]: e.target.value });
		// console.log('handleChange', e.target.name, e.target.value, user);
	};

	const handleSubmit = e => {
		e.preventDefault();
		axios
			.post('http://localhost:4000/api/auth/login', creds)
			.then(res => {
				localStorage.setItem('token', res.data.token);
				console.log(res)
				localStorage.setItem('user_id', res.data.id);
				getUser(creds)
				setCreds(initialCreds)
				const id = res.data.id;
				(console.log(props.history))
				props.history.push(`/protected/dashboard/${id}`);

			})
			.catch(err => console.log('error in login', err));
	};

	// useEffect(
	// 	() => {
	// 		getUser(creds);
	// 		// setCreds(initialCreds)

	// 	},
	// 	[ creds ]
	// );

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
                            value={creds.userName}
                        />
							</div>
                            <div className="form-group">
						<input
							type="password"
							name="password"
							className="form-group"
							placeholder="Password"
							onChange={handleChange}
							value={creds.password}
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