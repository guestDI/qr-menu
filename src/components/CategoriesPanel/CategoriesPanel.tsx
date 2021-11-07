import React, { useCallback, useRef, useState } from "react"
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
	const myRefs = useRef<any>([])
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

	// const onScroll = useCallback(() => {

	// }, [])

	const onScroll = useCallback(
		(index: number) => {
			setSelectedCategory(categories[index])

			myRefs?.current[index]?.scrollIntoView({
				inline: "center",
			})
		},
		[selectedCategory]
	)

	console.log(selectedCategory, "sel")

	return (
		<ul className={classes.container}>
			{categories.map((category, i) => (
				<li
					key={i}
					ref={(el) => (myRefs.current[i] = el)}
					// className={classes.active}
					className={selectedCategory === category ? classes.active : undefined}
				>
					<Link
						// value={category}
						// onClick={() => onButtonClick(category)}
						to={category}
						offset={-80}
						duration={500}
						spy={true}
						smooth={true}
						onSetActive={() => onScroll(i)}
						activeClass={classes.active}
					>
						{category}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default CategoriesPanel
