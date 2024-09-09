import { useState } from "react";
import styles from "./styles.module.scss";

interface ICategoriesBarProps {
	categories: { key: string; count: number }[];
	activeCategory: string;
}

const CategoriesBar = ({ categories }: ICategoriesBarProps) => {
	const [activeCategory, setActiveCategory] = useState<string | null>(
		categories[0].key
	);

	return (
		<div className={styles.navbarContainer}>
			<div className={styles.navbar}>
				{categories.map((category, index) => (
					<div
						key={index}
						className={`${styles.navItem} ${
							activeCategory === category.key ? styles.active : ""
						}`}
						onClick={() => setActiveCategory(category.key)}
					>
						<span>{category.key}</span>
						{category.count > 0 && (
							<div className={styles.cartCount}>{category.count}</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

export default CategoriesBar;
