import React, { FormEvent, useState } from "react"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
// import { Transition } from "react-transition-group"
import axiosInstance from "../api/axios";
// import Image from "next/image"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ITransition {
	[key: string]: Record<string, number | string>;
}

//move to common types
type CustomEvent = { preventDefault: () => void; target: { value: React.SetStateAction<string>; }; }

const transitions: ITransition = {
	entering: {
		display: "block",
	},
	entered: {
		opacity: 1,
		display: "block",
	},
	exiting: {
		display: "block",
	},
	exited: {
		opacity: "0",
		display: "none",
	},
}

const Registration: React.FC = () => {
	// const [placeValid, setPlaceValid] = useState(true);
	const [placeName, setPlaceName] = useState("");
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const register = async (e: FormEvent) => {
		e.preventDefault();

		const data = {
			organizationName: placeName,
			username,
			email,
			password,
		};

		try {
			const response = await axiosInstance.post("/places/firstRegistration", data);
			console.log("Registration successful:", response.data);

			// Redirect to another page or display success message
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				toast("Registration failed!");
			} else {
				toast("An unexpected error occurred");
			}
		}
	};

	const onUsernameChanged = (e: CustomEvent) => {
		e.preventDefault();
		setUsername(e.target.value);
	}

	const onEmailChanged = (e: CustomEvent) => {
		e.preventDefault();
		setEmail(e.target.value);
	}

	const onPlaceNameChanged = (e: CustomEvent) => {
		e.preventDefault();
		setPlaceName(e.target.value);
	}

	return (
		<div className="login-container">
			<div>Header</div>
			<div className="left">
				<div>
					<p>START FOR FREE</p>
					<h1>Create new account</h1>
					<div className="login-box">
						{/*<div className="logo">*/}
						{/*	<Image src="/logo_2.png" alt="Logo"*/}
						{/*				 width={140} height={140}/>*/}
						{/*</div>*/}
						{/*change to react hook form*/}
						<p>Already a Member? <a>Log In</a></p>
						<form onSubmit={register}>
							<div className="row-input">
								<div className="input-group">
									<Input name="username" type="text" placeholder="Username" size="lg" onChange={onUsernameChanged} />
								</div>
								<div className="input-group">
									<Input name="email" type="email" placeholder="Email" size="lg" onChange={onEmailChanged} />
								</div>
							</div>
							<div>
								<div className="input-group">
									<Input name="place" type="text" placeholder="Your organization" size="lg"
												 onChange={onPlaceNameChanged} />
								</div>
								<div className="input-group">
									<Input name="password" type="password" placeholder="Create password" size="lg"
												 onChange={(e) => setPassword(e.target.value)} />
								</div>
							</div>
							<ToastContainer theme="dark" autoClose={3000} position="bottom-right" />
							<Button type="submit" className="login-button">Create account</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Registration;
