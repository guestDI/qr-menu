import React from "react"
import { Add, Minus } from "../../inline-img/svg"
import classes from "./styles.module.css"

interface InputCounterProps {
	value: number
	increaseCount: (
		e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
	) => void
	decreaseCount: (
		e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
	) => void
}

const InputCounter: React.FC<InputCounterProps> = ({
	value,
	increaseCount,
	decreaseCount,
}) => {
	return (
		<div className={classes.inputContainer}>
			<button className={classes.btn} onClick={decreaseCount}>
				<Minus height={10} width={10} />
			</button>
			<span className={classes.valueContainer}>{value}</span>
			<button className={classes.btn} onClick={increaseCount}>
				<Add height={14} width={14} />
			</button>
		</div>
	)
}

export default InputCounter
