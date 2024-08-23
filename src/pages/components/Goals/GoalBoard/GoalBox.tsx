import React from "react";
import { EntityBox } from "../../../../types";
import styles from "./styles.module.scss";

const GoalBox: React.FC<EntityBox> = ({ imgUri, title, description }) => {
	return (
		<article className={styles.container}>
			<div className={styles.imgWrapper}>
				<img src={imgUri} alt={title} />
			</div>
			<div className={styles.text}>
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</article>
	);
};

export default GoalBox;
