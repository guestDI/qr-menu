import React, { FC } from "react";
import clsx from "clsx";
import styles from "./styles.module.scss";
import Image from "next/image";
import SettingsIcon from "../../../inline-img/svg/people-nearby.svg";

interface MenuItemProps {
	title: string;
	onClick: () => void;
	selected: boolean;
}

const SidebarItem: FC<MenuItemProps> = ({ title, onClick, selected }) => {
	return (
		<li
			onClick={onClick}
			className={clsx(styles.sidebarItem, { [styles.selected]: selected })}
		>
			<Image src={SettingsIcon} alt="Settings" width={40} height={40} />
			<span>{title}</span>
		</li>
	);
};

export default SidebarItem;
