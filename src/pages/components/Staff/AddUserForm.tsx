import React, { FC, useState } from "react";
import styles from "./styles.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import clsx from "clsx";
import Image from "next/image";
import AddUserIcon from "../../../inline-img/svg/user-add.svg";
import { CustomEvent } from "../../../model/types";

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

const AddUserForm: FC<AddUserFormProps> = ({ onClick }) => {
	const [username, setUsername] = useState("");
	const [role, setRole] = useState("manager");
	const [email, setEmail] = useState("");

	const onUsernameChanged = (e: CustomEvent) => {
		setUsername(e.target.value);
	};

	const onRoleChanged = (e: CustomEvent) => {
		setRole(e.target.value);
	};

	const onEmailChanged = (e: CustomEvent) => {
		setEmail(e.target.value);
	};

	const addUser = () => {
		onClick({username, role, email})
	}

	return (
		<div className={styles.row}>
			<Input
				size="lg"
				placeholder="Username"
				name="Username"
				type="text"
				onChange={onUsernameChanged}
			/>
			<Input
				size="lg"
				placeholder="Role"
				name="role"
				type="text"
				value={role}
				disabled={true}
				onChange={onRoleChanged}
			/>
			<Input
				size="lg"
				placeholder="Email"
				name="email"
				type="text"
				onChange={onEmailChanged}
			/>
			<Button className={clsx(styles.btn, styles.addBtn)} onClick={addUser}>
				<Image src={AddUserIcon} alt="Add User" width={20} height={20} />{" "}
			</Button>
		</div>
	);
};

export default AddUserForm;
