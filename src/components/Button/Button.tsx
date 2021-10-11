import clsx from "clsx"

import React from 'react'
import styles from './styles.module.css'

interface ButtonProps {
  content: React.ReactNode
  onClick: () => void
  round?: boolean
}

const Button: React.FC<ButtonProps> = ({ content, onClick, round }) => {
  return (
    <button onClick={onClick} className={clsx(styles.btn, round && styles.roundBtn)}>
      {content}
    </button>
  )
}

export default Button
