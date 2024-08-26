import clsx from "clsx";
import React from "react";
import { Button } from "../../../components";
import mobile from "../../../inline-img/mobile.png";
import styles from "./styles.module.scss";

interface HeroProps extends Partial<Pick<HTMLElement, "className" | "id">> {
	children?: React.ReactNode;
	onClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ className, id, onClick }) => {
	return (
		<section className={clsx(styles.container, className)} id={id}>
			<div className={styles.main}>
				<div className={styles.left}>
					<h1>Best app for managing your online menu</h1>
					<p>
						Make life of your client easier and bring ideal service in
						restaurant business
					</p>
					<div className={styles.buttons}>
						<Button onClick={onClick} className={styles.btn}>
							Try for free
						</Button>
						<Button className={styles.secondary} type="link">
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
