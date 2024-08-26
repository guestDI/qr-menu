import React from "react"
import SettingsIcon from "../../../inline-img/svg/settings.svg";
import Button from "../../../components/Button/Button"
import Image from "next/image"
import SidebarItem from "./SidebarItem/SidebarItem"

interface SidebarItem {
	title: string;
	icon: string;
	component?: Element;
	visible: boolean;
}

interface SidebarProps {
	sidebarItems: SidebarItem[]
	onClick: (i: number) => void;
	selectedIdx: number
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarItems, onClick, selectedIdx }) => {
	return (
		<aside>
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
			<div className="profile-btn-container">
				<Button onClick={() => {
				}} className="profile-btn">
					<Image src={SettingsIcon} alt="Settings" width={20} height={20} />{" "}
					Profile
				</Button>
			</div>
		</aside>
	);
};

export default Sidebar;
