import React, { useState } from "react"
import { Link } from "react-scroll"
import classes from "./styles.module.css"

interface CategoriesPanelProps {
	onClick?: (category: string) => void
	categories: string[]
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
	categories,
	// onClick,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>()

	// const onButtonClick = useCallback(
	// 	(value: string) => {
	// 		setSelectedCategory(value)

	// 		if (onClick) {
	// 			onClick(value)
	// 		}
	// 	},
	// 	[onClick]
	// )

	// console.log(activeSection, "active")

	return (
		<ul className={classes.container}>
			{categories.map((category, i) => (
				<Link
					// value={category}
					key={i}
					// onClick={() => onButtonClick(category)}
					// className={selectedCategory === category ? classes.active : undefined}
					to={category}
					offset={-80}
					duration={500}
					spy={true}
					smooth={true}
					onSetActive={(categoty: string) => setSelectedCategory(categoty)}
					activeClass={selectedCategory ? classes.active : undefined}
				>
					{category}
				</Link>
			))}
		</ul>
	)
}

export default CategoriesPanel
