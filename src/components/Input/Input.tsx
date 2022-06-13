import React from "react"
import styles from "./styles.module.css"

interface InputProps {
	placeholder: string
	name: string
	type: "text" | "email" | "password"
	onChange?: () => void
	disabled?: boolean
	size?: "sm" | "md" | "lg"
}

const Input: React.FC<InputProps> = ({
	onChange,
	name,
	placeholder,
	size = "md",
	type = "text",
	...rest
}) => {
	return (
		<div className={styles.inputContainer}>
			<input
				placeholder={placeholder}
				id={`${name}-input`}
				name={name}
				onChange={onChange}
				className={styles[size]}
				{...rest}
			/>
		</div>
	)
}

export default Input
