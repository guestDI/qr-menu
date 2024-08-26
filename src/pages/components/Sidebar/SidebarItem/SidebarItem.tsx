import React, { FC } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Image from "next/image";

interface MenuItemProps {
	title: string;
	onClick: () => void;
	selected: boolean;
	icon: string;
}

const SidebarItem: FC<MenuItemProps> = ({ title, onClick, selected, icon }) => {
	return (
		<li
			onClick={onClick}
			className={clsx(styles.sidebarItem, { [styles.selected]: selected })}
		>
			<Image src={icon} alt="Settings" width={30} height={30} />
			<span>{title}</span>
		</li>
	);
};

export default SidebarItem;
