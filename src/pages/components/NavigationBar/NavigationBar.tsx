import { Link } from "react-scroll"
import styles from "./styles.module.css"

const NavigationBar: React.FC = () => {
	return (
		<div className={styles.wrapper}>
			<ul className={styles.tabs}>
				<li>
					<Link
						to="services"
						spy={true}
						smooth={true}
						duration={500}
						title="Demo"
					>
						Key Features
					</Link>
				</li>
				<li>
					<Link
						to="projects"
						spy={true}
						smooth={true}
						duration={500}
						title="Projects"
					>
						Our goals
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
				{/*<li><Link to="contact" spy={true} smooth={true} duration={600} title="Contacts">Contact Us</Link></li>*/}
				{/*<li><NavLink to="/signUp" title="Sign Up">Sign Up</NavLink></li>*/}
				<li>
					<a>Try for free</a>
				</li>
			</ul>
		</div>
	)
}

export default NavigationBar
