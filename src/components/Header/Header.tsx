import Image from "next/image";
import Logo from "@/inline-img/mobile-logo.png";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";

const Header = () => {
	return (
		<div className={styles.header}>
			<div className="logo">
				<Image src={Logo} alt="Logo" width={60} height={60} />
			</div>
			<div className={styles.headerMenu}>
				<Link href="/">Home</Link>
			</div>
			<div className={styles.headerMenu}>
				<Link href="/">Our mission</Link>
			</div>
		</div>
	);
};

export default Header;
