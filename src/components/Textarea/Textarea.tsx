import React, { forwardRef } from "react";
import styles from "./styles.module.scss";
import { CustomEvent } from "../../model/types";

interface InputProps {
	placeholder: string;
	name: string;
	onChange?: (e: CustomEvent) => void;
	value?: string;
	disabled?: boolean;
	error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
	({ onChange, name, placeholder, value, error, ...rest }, ref) => {
		return (
			<div className={styles.textareaContainer}>
				<textarea
					placeholder={placeholder}
					id={`${name}-input`}
					name={name}
					onChange={onChange}
					value={value}
					ref={ref}
					{...rest}
				/>
				{error && <small className={styles.error}>{error}</small>}
			</div>
		);
	}
);

Textarea.displayName = "Textarea";

export default Textarea;
