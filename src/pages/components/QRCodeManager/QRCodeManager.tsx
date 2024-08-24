import React, { useState, useRef } from "react";
import Image from "next/image";
import { useReactToPrint } from "react-to-print";
import QrCodeIcon from "../../../inline-img/svg/qr-code.svg";
import PrintIcon from "../../../inline-img/svg/print.svg";
import styles from "./styles.module.scss";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import axiosInstance from "../../../api/axios";
import { CustomEvent } from "../../../types";

interface QRCodeManagerProps {
	table: string;
	qrCodeData: string;
}

const QrCodeManager = () => {
	const [fromTable, setFromTable] = useState(0);
	const [toTable, setToTable] = useState<number | null>(null);
	const [qrCodes, setQrCodes] = useState<QRCodeManagerProps[]>([]);

	const componentRef = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({
		content: () => componentRef.current,
	});

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
				id: "asd",
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
			<div>
				<h2>Tables</h2>
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
						Generate
					</Button>
					{qrCodes.length > 0 && (
						<Button className={styles.btn} onClick={handlePrint}>
							{PrintIcon ? (
								<Image src={PrintIcon} alt="print" width={25} height={25} />
							) : (
								"Print"
							)}
						</Button>
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

export default QrCodeManager;
