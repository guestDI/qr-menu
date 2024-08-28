import React, { FC } from "react";
import styles from "./styles.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import clsx from "clsx";
import Image from "next/image";
import AddUserIcon from "../../../inline-img/svg/user-add.svg";
import { useForm } from "react-hook-form";

interface AddUserFormProps {
	onClick: ({
		username,
		role,
		email,
	}: {
		username: string;
		role: string;
		email: string;
	}) => void;
}

const registerOptions = {
	username: { required: "UsernameName is required" },
	email: {
		required: "Email is required",
		pattern: {
			value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
			message: "Invalid email address",
		},
	},
};

const AddUserForm: FC<AddUserFormProps> = ({ onClick }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const addUser = (data: { username: string; role: string; email: string }) => {
		onClick(data);
	};

	return (
		<form onSubmit={handleSubmit(addUser)} className={styles.row}>
			<Input
				size="lg"
				placeholder="Username"
				type="text"
				error={errors?.username?.message}
				{...register("username", registerOptions.username)}
			/>
			<Input
				size="lg"
				placeholder="Email"
				type="text"
				error={errors?.email?.message}
				{...register("email", registerOptions.email)}
			/>
			<Input
				size="lg"
				placeholder="Role"
				type="text"
				value="manager"
				disabled={true}
				{...register("role", { value: "manager" })}
			/>
			<Button className={clsx(styles.btn, styles.addBtn)} type="submit">
				<Image src={AddUserIcon} alt="Add User" width={20} height={20} />{" "}
			</Button>
		</form>
	);
};

export default AddUserForm;
