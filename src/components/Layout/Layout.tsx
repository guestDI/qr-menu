import React from "react"
import styles from "./styles.module.css"

const Layout: React.FC = ({ children }) => {
	return (
		<div className={styles.layout}>
			<main className={styles.main}>{children}</main>
			<footer className={styles.footer}>
				<p className={styles.company}>
					Copyright &copy; 2021 The RvDi Company.
				</p>
			</footer>
		</div>
	)
}

export default Layout
