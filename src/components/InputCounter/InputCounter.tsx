import React from "react"
import Button from "../Button/Button"
import { Add } from "../../inline-img/svg"
import classes from "./styles.module.css"

interface InputCounterProps {
  value: number
  increaseCount: (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => void
  decreaseCount: (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>,
  ) => void
}

const InputCounter: React.FC<InputCounterProps> = ({
  value,
  increaseCount,
  decreaseCount,
}) => {
  return !value ? (
    <Button
      content={<Add width={22} height={22} />}
      onClick={increaseCount}
      round={true}
    />
  ) : (
    <div className={classes.inputContainer}>
      <button className={classes.btn} onClick={decreaseCount}>
        -
      </button>
      <span className={classes.valueContainer}>{value}</span>
      <button className={classes.btn} onClick={increaseCount}>
        +
      </button>
    </div>
  )
}

export default InputCounter
