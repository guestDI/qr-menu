import clsx from "clsx"
import React from "react"
import styles from "./styles.module.css"

interface ButtonProps {
	content: React.ReactNode
	onClick: (e: any) => void
	round?: boolean
	size?: "sm" | "md" | "lg"
	className?: any
}

const Button: React.FC<ButtonProps> = ({
	content,
	onClick,
	round,
	size = "md",
	className,
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
				round && computedRoundBtnClass
			)}
		>
			{content}
		</button>
	)
}

export default Button
