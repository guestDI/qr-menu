import clsx from "clsx"
import React from "react"
import styles from "./styles.module.scss"

interface HeroProps extends Partial<Pick<HTMLElement, "className" | "id">> {
	children?: React.ReactNode
}

const Hero: React.FC<HeroProps> = ({ className, id, children }) => {
	return (
		<div className={clsx(styles.container, className)} id={id}>
			<div className={styles.left}>{children}</div>
			<div>Image</div>
		</div>
	)
}

export default Hero
