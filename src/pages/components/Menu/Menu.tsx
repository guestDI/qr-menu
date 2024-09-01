import React, { useState, useRef, useCallback, useEffect } from "react"
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import QrCodeIcon from "../../../inline-img/svg/qr-code.svg";
import GenerateIcon from "../../../inline-img/svg/generate.svg";
import ClearIcon from "../../../inline-img/svg/clear.svg";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import axiosInstance from "../../../api/axios";
import { CustomEvent } from "@/model/types";
import useQrCodeStore from "@/stores/codeStore";
import useUserStore from "@/stores/userStore";

import useMenuStore from "@/stores/menuStore"

const Menu = () => {
	const [fromTable, setFromTable] = useState(0);
	const [toTable, setToTable] = useState<number | null>(null);
	const {
		menuData,
		setMenuData,
	} = useMenuStore();

	const user = useUserStore((state) => state.user);

	useEffect(() => {
		const fetchMenuData = async () => {
			try {
				const response = await axiosInstance.get(
					"/menu/" + user?.organizationId
				);
				console.log(response);
				setMenuData(response.data);
			} catch (error) {
				console.error("Error fetching menu data:", error);
			}
		};

		if(user?.organizationId){
			fetchMenuData();
		}
	}, [setMenuData, user]);

	const handleFromTableChange = (e: CustomEvent) => {
		setFromTable(Number(e.target.value));
	};

	const handleToTableChange = (e: CustomEvent) => {
		setToTable(Number(e.target.value));
	};

	return (
		<>
			<div className={styles.container}>
				<h2>Menu</h2>
				<div className={styles.inputGroup}>
					<Input
						name="from"
						type="text"
						placeholder="From"
						size="lg"
						onChange={handleFromTableChange}
					/>
					<Input
						name="from"
						type="text"
						placeholder="To"
						size="lg"
						onChange={handleToTableChange}
					/>
				</div>
			</div>
		</>
	);
};

export default Menu;
