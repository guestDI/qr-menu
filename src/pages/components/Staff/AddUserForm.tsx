import React, { FC } from "react";
import styles from "./styles.module.scss";
import Input from "../../../components/Input/Input";
import Button from "../../../components/Button/Button";
import clsx from "clsx";
import Image from "next/image";
import AddUserIcon from "../../../inline-img/svg/user-add.svg";

const AddUserForm: FC = () => {
	return (
		<div className={styles.row}>
			<Input
				size="lg"
				placeholder="Username"
				name="Username"
				type="text"
				onChange={() => {}}
			/>
			<Input
				size="lg"
				placeholder="Email (optional)"
				name="Email"
				type="text"
				onChange={() => {}}
			/>
			<Button className={clsx(styles.btn, styles.addBtn)} onClick={() => {}}>
				<Image src={AddUserIcon} alt="Add User" width={20} height={20} />{" "}
			</Button>
		</div>
	);
};

export default AddUserForm;
