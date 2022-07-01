import React from "react"
import { Feature } from "../../../types"
import styles from "./styles.module.scss"

const FeatureBox: React.FC<Feature> = ({ imgUri, title, description }) => {
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
	)
}

export default FeatureBox
