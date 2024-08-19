import clsx from "clsx"
import React from "react"
import styles from "./styles.module.scss"

interface ButtonProps {
	children: React.ReactNode
	onClick?: (e: Event) => void
	round?: boolean
	size?: "sm" | "md" | "lg"
	className?: string
	type?: "default" | "primary" | "submit" | "link"
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
	const btnClass = clsx(styles.btn, styles[btnSize], styles[type])
	const roundBtnSize = `roundBtn__${size}`
	const computedRoundBtnClass = [styles.roundBtn, styles[roundBtnSize]]

	return (
		<button
			onClick={onClick}
			className={clsx(
				btnClass,
				className,
				round && computedRoundBtnClass
				// type === "primary" ? styles.btnPrimary : styles.btnDefault
			)}
		>
			{children}
		</button>
	)
}

export default Button
