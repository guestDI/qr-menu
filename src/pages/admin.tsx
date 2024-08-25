import { NextPage } from "next";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/Button/Button";
import SettingsIcon from "../inline-img/svg/settings.svg";
import QRCodeIcon from "../inline-img/svg/qr-code.svg";
import PeopleIcon from "../inline-img/svg/people-nearby.svg";
import MenuIcon from "../inline-img/svg/menu.svg";
import SidebarItem from "./components/SidebarItem/SidebarItem";
import QRCodeManager from "./components/QRCodeManager/QRCodeManager";
import Staff from "./components/Staff/Staff";

const SIDEBAR_ITEMS = [
	{
		title: "My Menu",
		icon: MenuIcon,
	},
	{
		title: "QR Codes",
		component: <QRCodeManager />,
		icon: QRCodeIcon,
	},
	{
		title: "Settings",
		icon: SettingsIcon,
	},
	{
		title: "Staff",
		component: <Staff />,
		icon: PeopleIcon,
	},
	{
		title: "Orders",
		component: <Staff />,
		icon: PeopleIcon,
	},
];

const Admin: NextPage = () => {
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);

	const renderContent = () => {
		return SIDEBAR_ITEMS[selectedItemIndex].component;
	};

	return (
		<div className="main-container">
			<div className="header">
				<div className="logo">
					<Image src="/logo_2.png" alt="Logo" width={60} height={60} />
				</div>
				<span>Digital menu</span>
			</div>
			<div className="content">
				<aside>
					<ul>
						{SIDEBAR_ITEMS.map((item, i) => (
							<SidebarItem
								key={i}
								title={item.title}
								onClick={() => setSelectedItemIndex(i)}
								selected={selectedItemIndex === i}
								icon={item.icon}
							/>
						))}
					</ul>
					<div className="profile-btn-container">
						<Button onClick={() => {}} className="profile-btn">
							<Image src={SettingsIcon} alt="Settings" width={20} height={20} />{" "}
							Profile
						</Button>
					</div>
				</aside>
				<main>{renderContent()}</main>
			</div>
		</div>
	);
};

export default Admin;
