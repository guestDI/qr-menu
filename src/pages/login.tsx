import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useState } from "react"
import { useForm } from "react-hook-form"
import styles from "../../styles/Login.module.css"
import { Button, Input } from "../components"

const Login: NextPage = () => {
	const { register, handleSubmit } = useForm()
	const [placeValid, setPlaceValid] = useState(false)
	const [_, setData] = useState("")

	return (
		<div className={styles.container}>
			<Head>
				<title>Login</title>
				<meta name="description" content="Login to manage menu" />
				<link rel="icon" href="/menu-icon.png" />
			</Head>
			<header className={styles.header}>
				<Image
					className={styles.logo}
					src="/menu-icon.png"
					alt="Menu Logo"
					width={230}
					height={160}
				/>
			</header>

			<main>
				<form
					className={styles.form}
					onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
				>
					<Input
						placeholder="Name of your restaurant / hotel"
						{...register("firstName")}
						onChange={() => {}}
					/>
					{placeValid && (
						<div>
							<Input
								placeholder="Name of your restaurant / hotel"
								{...register("firstName")}
								onChange={() => {}}
							/>
							<Input
								placeholder="Name of your restaurant / hotel"
								{...register("firstName")}
								onChange={() => {}}
							/>
						</div>
					)}
					<Button type="submit" onClick={() => setPlaceValid(true)}>
						Log In
					</Button>
				</form>
			</main>
		</div>
	)
}

export default Login
