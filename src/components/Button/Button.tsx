import React from "react"
import styles from "./styles.module.css"

interface ButtonProps {
    title: string
    onClick: () => void
}

const Button: React.FC<ButtonProps> = ({title, onClick}) => {
    return (
        <button onClick={onClick} className={styles.btn}>{title}</button>
    )
}

export default Button