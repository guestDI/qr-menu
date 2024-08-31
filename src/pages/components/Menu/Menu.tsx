import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import QrCodeIcon from "../../../inline-img/svg/qr-code.svg";
import GenerateIcon from "../../../inline-img/svg/generate.svg";
import PrintIcon from "../../../inline-img/svg/print.svg";
import ClearIcon from "../../../inline-img/svg/clear.svg";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import axiosInstance from "../../../api/axios";
import { CustomEvent } from "@/model/types";
import useQrCodeStore from "@/stores/codeStore";
import useUserStore from "@/stores/userStore";

const Menu = () => {
	const [fromTable, setFromTable] = useState(0);
	const [toTable, setToTable] = useState<number | null>(null);
	const { qrCodes, setQrCodes, clearQrCodes } = useQrCodeStore();

	const user = useUserStore((state) => state.user);

	const componentRef = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

	const clear = useCallback(() => {
		clearQrCodes();
	}, [clearQrCodes]);

	const handleGenerateQrCodes = async () => {
		const tables = [];
		if (toTable) {
			for (let i = fromTable; i <= toTable; i++) {
				tables.push(i.toString());
			}
		} else {
			tables.push(fromTable);
		}

		try {
			const response = await axiosInstance.post("/qr/generate", {
				id: user?.organizationId,
				tables,
			});
			setQrCodes(response.data.qrCodes);
		} catch (error) {
			console.error("Error generating QR Codes:", error);
		}
	};

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
					<Button className={styles.btn} onClick={handleGenerateQrCodes}>
						{GenerateIcon ? (
							<Image src={GenerateIcon} alt="print" width={20} height={20} />
						) : (
							"Generate"
						)}
					</Button>
					{qrCodes.length > 0 && (
						<div className={styles.printBtnContainer}>
							<Button className={styles.btn} onClick={handlePrint}>
								{PrintIcon ? (
									<Image src={PrintIcon} alt="print" width={25} height={25} />
								) : (
									"Print"
								)}
							</Button>
							<Button className={styles.btn} onClick={clear}>
								{ClearIcon ? (
									<Image src={ClearIcon} alt="print" width={25} height={25} />
								) : (
									"Clear"
								)}
							</Button>
						</div>
					)}
				</div>
			</div>

			<div className={styles.qrCodesContainer}>
				{qrCodes.length > 0 ? (
					<>
						<div ref={componentRef} className={styles.qrGridWrapper}>
							{qrCodes.map((qrCode, index) => (
								<div key={index}>
									<p>Table {qrCode.table}</p>
									<Image
										src={qrCode.qrCodeData}
										alt={`QR Code for Table ${qrCode.table}`}
										width={150}
										height={150}
									/>
								</div>
							))}
						</div>
					</>
				) : (
					<div className={styles.noQRCodeContainer}>
						<Image
							height={60}
							width={60}
							src={QrCodeIcon}
							alt="Generate QR Code"
						/>
						<p>There are no active QR codes. Please generate any to proceed </p>
					</div>
				)}
			</div>
		</>
	);
};

export default Menu;
