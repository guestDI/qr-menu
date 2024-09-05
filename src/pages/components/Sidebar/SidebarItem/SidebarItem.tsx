import clsx from "clsx";
import Image from "next/image";
import { FC } from "react";
import styles from "./styles.module.scss";

interface MenuItemProps {
	title: string;
	onClick: () => void;
	selected: boolean;
	icon: string;
	isMobile: boolean;
}

const SidebarItem: FC<MenuItemProps> = ({
	title,
	onClick,
	selected,
	icon,
	isMobile,
}) => {
	return (
		<li
			onClick={onClick}
			className={clsx(styles.sidebarItem, { [styles.selected]: selected })}
		>
			<Image src={icon} alt="Settings" width={30} height={30} />
			{!isMobile && <span>{title}</span>}
		</li>
	);
};

export default SidebarItem;
