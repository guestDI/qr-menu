import React, { forwardRef } from "react";
import styles from "./styles.module.scss";
import { CustomEvent } from "@/model/types";

interface Option {
	label: string;
	value: string;
}

interface SelectProps {
	options: Option[];
	placeholder: string;
	name: string;
	onChange?: (e: CustomEvent) => void;
	value?: string;
	disabled?: boolean;
	size?: "sm" | "md" | "lg";
	error?: string;
	onAdd?: () => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
	(
		{
			options,
			onChange,
			name,
			placeholder,
			size = "md",
			value,
			error,
			onAdd,
			...rest
		},
		ref
	) => {
		return (
			<div className={styles.selectContainer}>
				<select
					id={`${name}-select`}
					name={name}
					onChange={onChange}
					value={value}
					className={styles[size]}
					ref={ref}
					{...rest}
				>
					<option value="" disabled>
						{placeholder}
					</option>
					{options.map((option) => (
						<option key={option.value} value={option.value}>
							{option.label}
						</option>
					))}
					<option value="add-new" onClick={onAdd}>
						Add New...
					</option>
				</select>
				{error && <small className={styles.error}>{error}</small>}
			</div>
		);
	}
);

Select.displayName = "Select";

export default Select;
