import clsx from "clsx"
import React from "react"
import classes from "./styles.module.scss"

interface TextWrapperProps {
	children: React.ReactNode
	numberOfRows?: number
	className?: any
}

const TextWrapper: React.FC<TextWrapperProps> = ({
	children,
	numberOfRows = 2,
	className,
}) => {
	return (
		<p
			className={clsx(classes.lineClamp, className)}
			style={{ WebkitLineClamp: numberOfRows }}
		>
			{children}
		</p>
	)
}

export default TextWrapper
