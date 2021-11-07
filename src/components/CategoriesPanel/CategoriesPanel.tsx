import React, { useRef } from "react"
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
	// const [selectedCategory, setSelectedCategory] = useState<string | null>()
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

	return (
		<ul className={classes.container}>
			{categories.map((category, i) => (
				<li
					key={i}
					ref={(el) => (myRefs.current[i] = el)}
					// className={classes.active}
				>
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
						onSetActive={() =>
							myRefs?.current[i]?.scrollIntoView({
								inline: "center",
							})
						}
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
