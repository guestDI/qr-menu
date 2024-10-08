import React, { useCallback, useRef, useState } from "react";
import { Link } from "react-scroll";
import classes from "./styles.module.scss";

interface CategoriesPanelProps {
	onClick?: (category: string) => void;
	categories: string[];
}

const CategoriesPanel: React.FC<CategoriesPanelProps> = ({
	categories,
	// onClick,
}) => {
	const [selectedCategory, setSelectedCategory] = useState<string | null>();
	const myRefs = useRef<any>([]);
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
			setSelectedCategory(categories[index]);

			myRefs?.current[index]?.scrollIntoView({
				inline: "center",
			});
		},
		[selectedCategory]
	);

	return (
		<ul className={classes.container}>
			{categories.map((category, i) => (
				<li
					key={i}
					ref={(el) => (myRefs.current[i] = el)}
					className={selectedCategory === category ? classes.active : undefined}
					onClick={() => setSelectedCategory(category)}
				>
					<Link
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
	);
};

export default CategoriesPanel;
