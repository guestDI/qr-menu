import React from "react";
import styles from "./styles.module.scss";
import { CustomEvent } from "../../model/types";

interface InputProps {
	placeholder: string;
	name: string;
	type: "text" | "email" | "password";
	onChange?: (e: CustomEvent) => void;
	value?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
}

const Input: React.FC<InputProps> = ({
	onChange,
	name,
	placeholder,
	size = "md",
	value,
	type = "text",
	...rest
}) => {
	return (
		<div className={styles.inputContainer}>
			<input
				placeholder={placeholder}
				id={`${name}-input`}
				name={name}
				type={type}
				onChange={onChange}
				value={value}
				className={styles[size]}
				{...rest}
			/>
		</div>
	);
};

export default Input;
