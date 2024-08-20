import React, { useCallback, useEffect, useState } from "react"
import Input from "../components/Input/Input"
import Button from "../components/Button/Button"
import { Transition } from "react-transition-group"
import Image from "next/image"

interface ITransition {
	[key: string]: Record<string, number | string>;
}

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
	const [placeValid, setPlaceValid] = useState(false);

	const changeState = useCallback(() => {
		setPlaceValid(true)
	}, []);

	useEffect(() => {
		setTimeout(changeState, 2000)
	}, [changeState])

	return (
		<div className="login-container">
			<div className="login-box">
				<div className="logo">
					<Image src="/logo_2.png" alt="Logo"
								 width={140} height={140}/>
				</div>
				<form>
					<div className="input-group">
						<Input name="place" type="text" placeholder="Your organization" size="lg"/>
					</div>
					<Transition in={placeValid} timeout={200}>
						{(state) => (
							<div
								style={{
									transition: "all .2s",
									opacity: 0,
									display: "none",
									...transitions[state],
								}}
							>
								<div className="input-group">
									<Input name="username" type="text" placeholder="Username" size="lg"/>
								</div>
								<div className="input-group">
									<Input name="username" type="text" placeholder="Email" size="lg"/>
								</div>
								<div className="input-group">
									<Input name="password" type="password" placeholder="Password" size="lg"/>
								</div>
							</div>
						)}
					</Transition>
					<Button type="submit" className="login-button">Log In</Button>
				</form>
			</div>
		</div>
	);
};

export default Registration;
