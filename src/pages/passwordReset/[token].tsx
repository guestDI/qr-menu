import type { NextPage } from "next";
import Image from "next/image";
import React from "react";
import { Button, Input } from "../../components";
import Link from "next/link";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../../api/axios";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const registerOptions = {
	password: { required: "Password is required" },
	confirmPassword: { required: "Password is required" },
};

const Token: NextPage<{ token: string }> = ({ token }) => {
	const router = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const resetPassword = async (data: {
		password: string;
		confirmPassword: string;
	}) => {
		try {
			await axiosInstance.post("/users/reset-password", {
				token: token,
				password: data.password,
				confirmPassword: data.confirmPassword,
			});
			router.push("/login");
		} catch (error: unknown) {
			console.log("error", error);
			toast("An unexpected error occurred");
		}
	};

	return (
		<div className="login-container">
			<div className="header">
				<div className="logo">
					<Image src="/logo_2.png" alt="Logo" width={60} height={60} />
				</div>
				<span>Digital menu</span>
				<div className="header-menu">
					<Link href="/public">Home</Link>
				</div>
				<div className="header-menu">
					<Link href="/public">Our mission</Link>
				</div>
			</div>
			<div className="left-container">
				<div className="form-group">
					<p>WELCOME BACK</p>
					<h1 className="title">Reset my password</h1>
					<div className="login-box">
						{/*change to react hook form*/}
						<p>
							Ready to log in? <Link href="/login">Login</Link>
						</p>
						<form onSubmit={handleSubmit(resetPassword)}>
							<div>
								<div className="input-group">
									<Input
										type="password"
										placeholder="Password"
										size="lg"
										error={errors?.password?.message as string}
										{...register("password", registerOptions.password)}
									/>
									<Input
										type="password"
										placeholder="Confirm password"
										size="lg"
										error={errors?.password?.message as string}
										{...register("confirmPassword", registerOptions.password)}
									/>
								</div>
							</div>
							<ToastContainer
								theme="dark"
								autoClose={3000}
								position="bottom-right"
							/>
							<Button type="submit" className="login-button">
								Reset Password
							</Button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

// @ts-ignore
export async function getStaticPaths() {
	return {
		paths: [], // No paths are pre-rendered at build time
		fallback: "blocking", // Pages will be generated on-demand
	};
}

export async function getStaticProps({
	params,
}: {
	params: Record<string, string>;
}) {
	const { token } = params;

	return {
		props: {
			token,
		},
	};
}

export default Token;
