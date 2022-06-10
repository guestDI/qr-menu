import React, { ChangeEventHandler } from "react"
import styles from "./styles.module.css"

interface InputProps {
	placeholder: string
	name: string
	onChange: ChangeEventHandler<HTMLInputElement>
	disabled?: boolean
	size?: "sm" | "md" | "lg"
}

const Input: React.FC<InputProps> = ({
	onChange,
	name,
	placeholder,
	size = "md",
	...rest
}) => {
	return (
		<div className={styles.inputContainer}>
			<input
				type="text"
				placeholder={placeholder}
				id={`${name}-input`}
				name={name}
				onChange={onChange}
				className={styles[size]}
				{...rest}
			/>
			{/* {errors[name] && <span className={styles.error}>{errors[name].message}</span>} */}
		</div>
	)
}

export default Input
