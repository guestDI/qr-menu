import { NextPage } from "next";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import SettingsIcon from "../inline-img/svg/settings.svg";
import QRCodeIcon from "../inline-img/svg/qr-code.svg";
import PeopleIcon from "../inline-img/svg/people-nearby.svg";
import MenuIcon from "../inline-img/svg/menu.svg";
import QRCodeManager from "./components/QRCodeManager/QRCodeManager";
import Staff from "./components/Staff/Staff";
import withAuth from "../hoc/withAuth";
import Sidebar from "./components/Sidebar/Sidebar";

const getSidebarItems = (role: string) => {
	return [
		{
			title: "My Menu",
			component: <QRCodeManager />,
			icon: MenuIcon,
			visible: true,
		},
		{
			title: "QR Codes",
			component: <QRCodeManager />,
			icon: QRCodeIcon,
			visible: true,
		},
		{
			title: "Settings",
			component: <QRCodeManager />,
			icon: SettingsIcon,
			visible: role === "admin",
		},
		{
			title: "Staff",
			component: <Staff />,
			icon: PeopleIcon,
			visible: role === "admin",
		},
		{
			title: "Orders",
			component: <Staff />,
			icon: PeopleIcon,
			visible: true,
		},
	].filter((item) => item.visible);
};

// eslint-disable-next-line react/prop-types
const Admin: NextPage<{ role: string }> = ({ role }) => {
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);

	const sidebarItems = useMemo(() => getSidebarItems(role), [role]);

	const renderContent = () => {
		return sidebarItems[selectedItemIndex].component;
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
				<Sidebar
					sidebarItems={sidebarItems}
					onClick={(i) => setSelectedItemIndex(i)}
					selectedIdx={selectedItemIndex}
				/>
				<main>{renderContent()}</main>
			</div>
		</div>
	);
};

export default withAuth(Admin);
