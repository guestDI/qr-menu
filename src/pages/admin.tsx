import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import QRCodeIcon from "../inline-img/svg/qr-code.svg";
import PeopleIcon from "../inline-img/svg/people-nearby.svg";
import MenuIcon from "../inline-img/svg/menu.svg";
import Sidebar from "./components/Sidebar/Sidebar";
import { jwtDecode } from "jwt-decode";
import { IDecodedToken } from "@/model/types";
import useUserStore from "@/stores/userStore";
import dynamic from "next/dynamic";
import useAppStore from "@/stores/appStore";
import axiosInstance from "@/api/axios";
import useMenuStore from "@/stores/menuStore";
import Logo from "@/inline-img/mobile-logo.png";

const QRCodeManager = dynamic(
	() => import("./components/QRCodeManager/QRCodeManager")
);
const Staff = dynamic(() => import("./components/Staff/Staff"));
const MenuCreator = dynamic(
	() => import("@/pages/components/MenuCreator/MenuCreator")
);

const getSidebarItems = (role: string) => {
	return [
		{
			title: "Creator",
			component: <MenuCreator />,
			icon: MenuIcon,
			visible: true,
		},
		{
			title: "Codes",
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
	const { menuData, setMenuData } = useMenuStore();
	const isPreviewOpen = useAppStore((state) => state.isPreviewOpen);

	const [ref, setRef] = useState();
	const container = ref?.contentWindow?.document?.body;

	useEffect(() => {
		if (user) {
			setUser(user);
		}
	}, [user, setUser]);

	useEffect(() => {
		const fetchMenuData = async () => {
			try {
				const response = await axiosInstance.get(
					"/menu/" + user?.organizationId
				);
				setMenuData(response.data);
			} catch (error) {
				console.error("Error fetching menu data:", error);
			}
		};

		if (user?.organizationId) {
			fetchMenuData();
		}
	}, [setMenuData, user]);

	// useEffect(() => {
	// 	if (ref?.contentDocument) {
	// 		// Получение всех стилей из основного документа
	// 		const styleSheets = Array.from(document.styleSheets);
	// 		const iframeDocument = ref.contentDocument;
	//
	// 		styleSheets.forEach((styleSheet) => {
	// 			try {
	// 				if (styleSheet.cssRules) {
	// 					const newStyleElement = iframeDocument.createElement("style");
	//
	// 					for (let i = 0; i < styleSheet.cssRules.length; i++) {
	// 						const cssRule = styleSheet.cssRules[i];
	// 						newStyleElement.appendChild(
	// 							iframeDocument.createTextNode(cssRule.cssText)
	// 						);
	// 					}
	//
	// 					iframeDocument.head.appendChild(newStyleElement);
	// 				} else if (styleSheet.href) {
	// 					// Если стили подключены через <link>
	// 					const newLinkElement = iframeDocument.createElement("link");
	// 					newLinkElement.rel = "stylesheet";
	// 					newLinkElement.href = styleSheet.href;
	// 					iframeDocument.head.appendChild(newLinkElement);
	// 				}
	// 			} catch (error) {
	// 				console.error("Ошибка при вставке стилей в iframe:", error);
	// 			}
	// 		});
	// 	}
	// }, [ref]);

	const sidebarItems = useMemo(
		() => getSidebarItems(user ? user.role : ""),
		[user?.role]
	);

	const renderContent = () => {
		return sidebarItems[selectedItemIndex].component;
	};

	return (
		<div className="main-container">
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

//move to _app.tsx
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
