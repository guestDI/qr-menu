import clsx from "clsx";
import React, { MouseEventHandler } from "react";
import styles from "./styles.module.scss";

interface ButtonProps {
	children: React.ReactNode;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	round?: boolean;
	size?: "sm" | "md" | "lg";
	className?: string;
	type?: "submit" | "reset" | "button" | "link";
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	round,
	size = "md",
	className,
	type = "button",
	children,
}) => {
	const btnSize = `btn__${size}`;
	const btnClass = clsx(styles.btn, styles[btnSize], styles[type]);
	const roundBtnSize = `roundBtn__${size}`;
	const computedRoundBtnClass = [styles.roundBtn, styles[roundBtnSize]];

	return (
		<button
			// @ts-ignore
			type={type}
			onClick={onClick}
			className={clsx(
				round && computedRoundBtnClass,
				btnClass,
				className
				// type === "primary" ? styles.btnPrimary : styles.btnDefault
			)}
		>
			{children}
		</button>
	);
};

export default Button;
