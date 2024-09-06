import { forwardRef } from "react";
import { CustomEvent } from "../../model/types";
import styles from "./styles.module.scss";

interface InputProps {
	placeholder: string;
	name: string;
	type: "text" | "email" | "password" | "number";
	onChange?: (e: CustomEvent) => void;
	value?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
	(
		{
			onChange,
			name,
			placeholder,
			size = "md",
			value,
			type = "text",
			error,
			...rest
		},
		ref
	) => {
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
					ref={ref}
					{...rest}
				/>
				{error && <small className={styles.error}>{error}</small>}
			</div>
		);
	}
);

Input.displayName = "Input";

export default Input;
