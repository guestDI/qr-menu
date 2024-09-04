import { FC } from "react";
import { IMenuItem } from "@/model/types";
import styles from "./styles.module.scss";
import Image from "next/image";
import Button from "@/components/Button/Button";
import Edit from "@/inline-img/svg/edit.svg";

interface MenuCardProps {
	menuItem: IMenuItem;
}

const MenuCard: FC<MenuCardProps> = ({ menuItem }) => {
	return (
		<div className={styles["card-container"]}>
			<div className={styles.cardHeader}>
				<p className={styles.title}>{menuItem.title}</p>
				<Button size="sm">
					<Image width={18} height={18} src={Edit} alt="edit menu item" />
				</Button>
			</div>
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
