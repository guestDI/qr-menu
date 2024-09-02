import { FC } from "react";
import { IMenuItem } from "@/model/types";
import styles from "./styles.module.scss";
import Image from "next/image";

interface MenuCardProps {
	menuItem: IMenuItem;
}

const MenuCard: FC<MenuCardProps> = ({ menuItem }) => {
	return (
		<div className={styles["card-container"]}>
			<p className={styles.title}>{menuItem.title}</p>
			<div className={styles.imageContainer}>
				<Image width={120} height={120} src={menuItem.image} alt="menu item" />
			</div>
			<p className={styles["card-price"]}>&euro;{menuItem.price}</p>
			<ul className={styles.desc}>
				{menuItem.description.split("/").map((row, index) => {
					return <li key={index}>{row}</li>;
				})}
			</ul>
		</div>
	);
};

export default MenuCard;
