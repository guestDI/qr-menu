import Button from "@/components/Button/Button";
import Edit from "@/inline-img/svg/edit.svg";
import { IMenuItem } from "@/model/types";
import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.scss";

interface MenuCardProps {
	menuItem: IMenuItem;
	onEdit: () => void;
}

const MenuCard: FC<MenuCardProps> = ({ menuItem, onEdit }) => {
	return (
		<div className={styles["card-container"]}>
			<div className={styles.cardHeader}>
				<p className={styles.title}>{menuItem.title}</p>
				<Button size="sm" onClick={onEdit}>
					<Image width={18} height={18} src={Edit} alt="edit menu item" />
				</Button>
			</div>
			<div className={styles.content}>
				<div>
					{menuItem.image && menuItem.image !== "null" ? (
						<Image
							width={110}
							height={110}
							src={menuItem.image}
							alt="menu item"
						/>
					) : (
						<div className={styles.placeholder}>No image</div>
					)}
					<p className={styles["card-price"]}>&euro;{menuItem.price}</p>
				</div>

				<ul className={styles.desc}>
					{menuItem.description.split("/").map((row, index) => {
						return <li key={index}>{row}</li>;
					})}
				</ul>
			</div>
		</div>
	);
};

export default MenuCard;
