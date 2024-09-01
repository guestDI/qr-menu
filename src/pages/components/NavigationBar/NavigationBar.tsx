import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Button } from "../../../components";
import styles from "./styles.module.scss";
import clsx from "clsx";

const NavigationBar: React.FC<{ onClick: () => void }> = ({ onClick }) => {
	const [showButtons, setShowButtons] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			if (offset > 310) {
				setShowButtons(true);
			} else {
				setShowButtons(false);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<div className={styles.wrapper}>
			<ul className={styles.tabs}>
				<li>
					<Link
						to="goals"
						spy={true}
						smooth={true}
						duration={500}
						title="Goals"
					>
						Our goals
					</Link>
				</li>
				<li>
					<Link
						to="features"
						spy={true}
						smooth={true}
						duration={500}
						title="Features"
					>
						Key Features
					</Link>
				</li>
				<li>
					<Link
						to="prices"
						spy={true}
						smooth={true}
						duration={500}
						title="Prices"
					>
						Pricing
					</Link>
				</li>
			</ul>
			<div className={clsx(styles.navButtons, { [styles.show]: showButtons })}>
				<Button className={styles.secondary} type="button">
					Watch demo
				</Button>
				<Button onClick={onClick} className={styles.btn}>
					Try for free
				</Button>
			</div>
		</div>
	);
};

export default NavigationBar;
