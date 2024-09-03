import React, { ReactElement } from "react";
import SidebarItem from "./SidebarItem/SidebarItem";
import styles from "./styles.module.scss";

interface SidebarItem {
	title: string;
	icon: string;
	component: ReactElement;
	visible: boolean;
}

interface SidebarProps {
	sidebarItems: Array<SidebarItem>;
	onClick: (i: number) => void;
	selectedIdx: number;
}

const Sidebar: React.FC<SidebarProps> = ({
	sidebarItems,
	onClick,
	selectedIdx,
}) => {
	return (
		<aside className={styles.asideContent}>
			<ul>
				{sidebarItems.map((item, i) => (
					<SidebarItem
						key={i}
						title={item.title}
						onClick={() => onClick(i)}
						selected={selectedIdx === i}
						icon={item.icon}
					/>
				))}
			</ul>
		</aside>
	);
};

export default Sidebar;
