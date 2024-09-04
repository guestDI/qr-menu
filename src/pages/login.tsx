import type { NextPage } from "next";
import React from "react";
import { Button, Input } from "../components";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../api/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Header from "@/components/Header/Header";

const registerOptions = {
	username: { required: "Username is required" },
	password: { required: "Password is required" },
};

const Login: NextPage = () => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const login = async (data: any): Promise<void> => {
		try {
			await axiosInstance.post("/users/login", data).then((response) => {
				Cookies.set("authToken", response.data.token);
				router.push("/admin");
			});
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
		} catch (error: unknown) {
			console.log("error", error);
			toast("An unexpected error occurred");
		}
	};

	const requestResetPassword = async () => {
		try {
			await axiosInstance.post("/users/request-password-reset", {
				username: "dihnatov",
			});
			toast("Reset link sent to your email");
		} catch (error: unknown) {
			console.log("error", error);
			toast("An unexpected error occurred");
		}
	};

	return (
		<div className="login-container">
			<Header />
			<div className="left-container">
				<div className="form-group">
					<p>WELCOME BACK</p>
					<h1 className="title">Sign In</h1>
					<div className="login-box">
						<p className="reset-link-wrapper">
							<span>Forgot your password?</span>
							<Button
								className="link-btn"
								type="link"
								onClick={requestResetPassword}
							>
								Reset
							</Button>
						</p>
						<form onSubmit={handleSubmit(login)}>
							<div className="registration-row-input">
								<Input
									type="text"
									placeholder="Username"
									size="lg"
									error={errors?.username?.message as string}
									{...register("username", registerOptions.username)}
								/>
							</div>
							<div>
								<div className="input-group">
									<Input
										type="password"
										placeholder="Password"
										size="lg"
										error={errors?.password?.message as string}
										{...register("password", registerOptions.password)}
									/>
								</div>
							</div>
							<ToastContainer
								theme="dark"
								autoClose={3000}
								position="bottom-right"
							/>
							<Button type="submit" className="login-button">
								Log In
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Login;
