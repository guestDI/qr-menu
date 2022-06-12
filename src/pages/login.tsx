import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import { useForm } from "react-hook-form"
import { Transition } from "react-transition-group"
import styles from "../../styles/Login.module.css"
import { Button, Input } from "../components"
import { Arrow } from "../inline-img/svg"

const transitions: any = {
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

const Login: NextPage = () => {
	const router = useRouter()
	const { register, handleSubmit } = useForm()
	const [placeValid, setPlaceValid] = useState(false)
	const [_, setData] = useState("")

	const login = useCallback(() => {
		router.push("/admin")
	}, [router])

	const btn = (
		<Button onClick={placeValid ? login : () => setPlaceValid(true)}>
			<div className={styles.btnContent}>
				<span>Next</span>
				<Arrow />
			</div>
		</Button>
	)

	return (
		<div className={styles.container}>
			<Head>
				<title>Login</title>
				<meta name="description" content="Login to manage menu" />
				<link rel="icon" href="/menu-icon.png" />
			</Head>
			<header className={styles.header}>
				<div className={styles.img}>
					<Image
						className={styles.logo}
						src="/menu-icon.png"
						alt="Menu Logo"
						width={230}
						height={160}
					/>
				</div>
			</header>

			<main className={styles.main}>
				<form
					className={styles.form}
					onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
				>
					<Input
						placeholder="Name of your restaurant / hotel"
						{...register("firstName")}
						onChange={() => {}}
						size="lg"
						disabled={placeValid}
					/>
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
								<Input
									placeholder="Username"
									{...register("firstName")}
									onChange={() => {}}
									size="lg"
								/>
								<Input
									placeholder="Password"
									{...register("firstName")}
									onChange={() => {}}
									size="lg"
								/>
							</div>
						)}
					</Transition>
					{btn}
				</form>
			</main>
		</div>
	)
}

export default Login
