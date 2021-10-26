import React, { useCallback, useState } from "react"
import { Link } from "react-scroll"
import classes from "./styles.module.css"

interface CategoriesPanelProps {
	onClick?: (category: string) => void
	categories: string[]
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
	categories,
	onClick,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	const onButtonClick = useCallback(
		(value: string) => {
			setSelectedCategory(value)

			if (onClick) {
				onClick(value)
			}
		},
		[onClick]
	)

	return (
		<ul className={classes.container}>
			{categories.map((category, i) => (
				<Link
					value={category}
					key={i}
					onClick={() => onButtonClick(category)}
					className={selectedCategory === category ? classes.active : undefined}
					to={category}
					offset={-80}
					duration={500}
					spy={true}
					smooth={true}
				>
					{category}
				</Link>
			))}
		</ul>
	)
}

export default CategoriesPanel
