import React from "react"
import { Feature } from "../../../types"
import FeatureBox from "../FeatureBox/FeatureBox"
import styles from "./styles.module.scss"

interface FeaturesGridProps {
	data: Feature[]
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ data }) => {
	const features = data.map((feature, index) => {
		return <FeatureBox key={index} {...feature} />
	})

	return <div className={styles.grid}>{features}</div>
}

export default FeaturesGrid
