import React from "react"
import { Feature } from "../../../types"
import FeatureBox from "../FeatureBox/FeatureBox"

interface FeaturesGridProps {
	data: Feature[]
}

const FeaturesGrid: React.FC<FeaturesGridProps> = ({ data }) => {
	const features = data.map((feature, index) => {
		return <FeatureBox key={index} {...feature} />
	})

	return <div>{features}</div>
}

export default FeaturesGrid
