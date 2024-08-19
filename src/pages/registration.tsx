import React from 'react';
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"

const Registration = () => {
	return (
		<div className="login-container">
			<div className="login-box">
				<div className="logo">
					<span>D</span>
				</div>
				<form>
					<div className="input-group">
						<Input name="username" type="text" placeholder="Username" />
					</div>
					<div className="input-group">
						<Input name="password" type="password" placeholder="Password" />
					</div>
					<Button type="submit" className="login-button">Log In</Button>
				</form>
				<a href="#" className="forgot-password">Lost your password?</a>
			</div>
		</div>
	);
};

export default Registration;
