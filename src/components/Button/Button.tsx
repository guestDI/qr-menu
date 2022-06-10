import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

interface ButtonProps {
	children: React.ReactNode
	onClick?: (e: any) => void
	round?: boolean
	size?: "sm" | "md" | "lg"
	className?: string
	type?: "default" | "primary" | "submit"
}

const Button: React.FC<ButtonProps> = ({
	onClick,
	round,
	size = "md",
	className,
	type = "default",
	children,
}) => {
	const btnSize = `btn__${size}`
	const roundBtnSize = `roundBtn__${size}`
	const computedRoundBtnClass = [styles.roundBtn, styles[roundBtnSize]]

	return (
		<button
			onClick={onClick}
			className={clsx(
				styles.btn,
				styles[btnSize],
				className,
				round && computedRoundBtnClass,
				type === "primary" ? styles.btnPrimary : styles.btnDefault
			)}
		>
			{children}
		</button>
	)
}

export default Button
