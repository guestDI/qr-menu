import React, { FC } from "react";
import styles from "./styles.module.scss";
import Input from "@/components/Input/Input";
import Button from "@/components/Button/Button";
import clsx from "clsx";
import { useForm } from "react-hook-form";

interface EditMemberFormProps {
	onClick: (id: { username: string; role: string; email: string }) => void;
	onCancel: () => void;
}

const registerOptions = {
	username: { required: "Username is required" },
	email: {
		required: "Email is required",
		pattern: {
			value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
			message: "Invalid email address",
		},
	},
	role: { required: "Role is required" },
};

const EditMemberForm: FC<EditMemberFormProps> = ({ onClick, onCancel }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const editMember = (data: {
		username: string;
		role: string;
		email: string;
	}) => {
		onClick(data);
		reset();
	};

	return (
		// @ts-ignore
		<form onSubmit={handleSubmit(editMember)} className={styles.editMemberForm}>
			<h3>Edit member</h3>
			<div className={styles.row}>
				<Input
					size="lg"
					placeholder="Username"
					type="text"
					error={errors?.username?.message as string}
					{...register("username", registerOptions.username)}
				/>
				<Input
					size="lg"
					placeholder="Email"
					type="text"
					error={errors?.email?.message as string}
					{...register("email", registerOptions.email)}
				/>
				<Input
					size="lg"
					placeholder="Role"
					type="text"
					disabled={true}
					{...register("role", { value: "manager" })}
				/>
			</div>
			<div className={styles.editBtnContainer}>
				<Button className={styles.secondary} type="button" onClick={onCancel}>
					Cancel
				</Button>
				<Button className={clsx(styles.btn, styles.saveBtn)} type="submit">
					Save
				</Button>
			</div>
		</form>
	);
};

export default EditMemberForm;
