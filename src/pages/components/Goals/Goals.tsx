import React from "react"
import mobile from "../../../inline-img/goals-image.png"
import { EntityBox } from "../../../types"
import GoalBox from "./GoalBoard/GoalBox"
import styles from "./styles.module.scss"

const Goals: React.FC<{ data: EntityBox[] }> = ({ data }) => {
	const goals = data.map((goal, index) => {
		return <GoalBox key={index} {...goal} />
	})

	return (
		<div className={styles.container}>
			<div className={styles.left}>
				<img src={mobile.src} alt="Goals" />;
			</div>
			<div className={styles.right}>
				<h3>Our goals</h3>
				<p>Increase productivity with a simple app for managing menu.</p>
				{goals}
			</div>
		</div>
	)
}

export default Goals
