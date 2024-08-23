import { Link } from "react-scroll";
import { Button } from "../../../components";
import styles from "./styles.module.scss";

const NavigationBar: React.FC = () => {
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
				<Button className={styles.btn}>Try for free</Button>
			</ul>
		</div>
	);
};

export default NavigationBar;
