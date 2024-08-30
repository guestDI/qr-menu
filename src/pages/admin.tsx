import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import SettingsIcon from "../inline-img/svg/settings.svg";
import QRCodeIcon from "../inline-img/svg/qr-code.svg";
import PeopleIcon from "../inline-img/svg/people-nearby.svg";
import MenuIcon from "../inline-img/svg/menu.svg";
import Sidebar from "./components/Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/model/types";
import useUserStore from "@/stores/userStore";
import dynamic from "next/dynamic";

const QRCodeManager = dynamic(
	() => import("./components/QRCodeManager/QRCodeManager")
);
const Staff = dynamic(() => import("./components/Staff/Staff"));

const getSidebarItems = (role: string) => {
	return [
		{
			title: "My Menu",
			component: <div>My menu</div>,
			icon: MenuIcon,
			visible: true,
		},
		{
			title: "QR Codes",
			component: <QRCodeManager />,
			icon: QRCodeIcon,
			visible: true,
		},
		// {
		// 	title: "Settings",
		// 	component: <div>Settings</div>,
		// 	icon: SettingsIcon,
		// 	visible: role === "admin",
		// },
		{
			title: "Staff",
			component: <Staff />,
			icon: PeopleIcon,
			visible: role === "admin",
		},
		{
			title: "Orders",
			component: <div>Orders</div>,
			icon: PeopleIcon,
			visible: true,
		},
	].filter((item) => item.visible);
};

// eslint-disable-next-line react/prop-types
const Admin: NextPage<{ user: IDecodedToken | null }> = ({ user }) => {
	const [selectedItemIndex, setSelectedItemIndex] = useState(0);
	const setUser = useUserStore((state) => state.setUser);

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [user, setUser]);

	const sidebarItems = useMemo(
		() => getSidebarItems(user ? user.role : ""),
		[user?.role]
	);

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

export const getServerSideProps: GetServerSideProps = async (context) => {
	const token = context.req.cookies.authToken;
	let decodedToken: IDecodedToken | null = null;

	if (token) {
		decodedToken = jwtDecode<IDecodedToken>(token);
	}

	return {
		props: {
			user: decodedToken,
		},
	};
};

export default Admin;
