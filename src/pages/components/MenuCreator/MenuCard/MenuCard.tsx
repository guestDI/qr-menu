import Button from "@/components/Button/Button";
import Delete from "@/inline-img/svg/delete.svg";
import Edit from "@/inline-img/svg/edit.svg";
import { IMenuItem } from "@/model/types";
import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.scss";

interface MenuCardProps {
	menuItem: IMenuItem;
	onEdit: () => void;
	onDelete: () => void;
}

const MenuCard: FC<MenuCardProps> = ({ menuItem, onEdit, onDelete }) => {
	return (
		<div className={styles["card-container"]}>
			<div className={styles.cardHeader}>
				<p className={styles.title}>{menuItem.title}</p>
				<div>
					<Button size="sm" onClick={onEdit}>
						<Image width={18} height={18} src={Edit} alt="edit menu item" />
					</Button>
					<Button size="sm" onClick={onDelete}>
						<Image width={18} height={18} src={Delete} alt="delete menu item" />
					</Button>
				</div>
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
