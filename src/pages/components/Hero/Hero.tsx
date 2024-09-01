import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../components";
import mobile from "../../../inline-img/mobile.png";
import styles from "./styles.module.scss";

interface HeroProps extends Partial<Pick<HTMLElement, "className" | "id">> {
	children?: React.ReactNode;
	onClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ className, id, onClick }) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const sectionRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			const offset = window.scrollY;
			// @ts-ignore
			if (offset <= sectionRef.current.offsetHeight / 2) {
				setIsScrolled(false);
			} else {
				setIsScrolled(true);
			}
		};
		window.addEventListener("scroll", handleScroll);

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	return (
		<section
			className={clsx(styles.container, className)}
			id={id}
			ref={sectionRef}
		>
			<div className={styles.main}>
				<div className={styles.left}>
					<h1>Best app for managing your online menu</h1>
					<p>
						Make life of your client easier and bring ideal service in
						restaurant business
					</p>
					<div
						className={clsx(styles.buttons, { [styles.hidden]: isScrolled })}
					>
						<Button onClick={onClick} className={styles.btn}>
							Try for free
						</Button>
						<Button className={styles.secondary} type="button">
							Watch demo
						</Button>
					</div>
				</div>
				<div className={styles.right}>
					<img src={mobile.src} alt="Mobile" />;
				</div>
			</div>
		</section>
	);
};

export default Hero;
