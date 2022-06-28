import React from "react"
import { Feature } from "../../../types"

const FeatureBox: React.FC<Feature> = ({ imgUri, title, description }) => {
	return (
		<article>
			<img src={imgUri} alt={title} />
			<div className="text">
				<h3>{title}</h3>
				<p>{description}</p>
			</div>
		</article>
	)
}

export default FeatureBox
