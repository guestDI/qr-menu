import React from "react";
import styles from "./styles.module.scss";

const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.footer__content}>
				<div className={styles.footer__logo}>QR EXPRESS MENU</div>
				<nav className={styles.footer__nav}>
					<a href="#work">WORK</a>
					<a href="#services">SERVICES</a>
					<a href="#about">ABOUT</a>
					<a href="#blog">BLOG</a>
					<a href="#contact">CONTACT</a>
				</nav>
				<div className={styles.footer__socials}>
					<a href="#facebook">
						<i className="fa fa-facebook"></i>
					</a>
					<a href="#twitter">
						<i className="fa fa-twitter"></i>
					</a>
					<a href="#instagram">
						<i className="fa fa-instagram"></i>
					</a>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
