import React, { useState } from "react";
import axios from "axios";
import Image from "next/image";
import QrCodeIcon from "../../../inline-img/svg/qr-code.svg";
import styles from "./styles.module.scss";

interface QRCodeManagerProps {
	table: string;
	qrCodeData: string;
}

const QrCodeManager = () => {
	const [id, setId] = useState("");
	const [tables, setTables] = useState([]);
	const [qrCodes, setQrCodes] = useState<QRCodeManagerProps[]>([]);

	const handleGenerateQrCodes = async () => {
		try {
			const response = await axios.post("/api/qr/generate", { id, tables });
			setQrCodes(response.data.qrCodes);
		} catch (error) {
			console.error("Error generating QR Codes:", error);
			alert("Failed to generate QR Codes");
		}
	};

	const handleAddTable = () => {
		setTables([...tables, ""]);
	};

	const handleTableChange = (index, value) => {
		const updatedTables = [...tables];
		updatedTables[index] = value;
		setTables(updatedTables);
	};

	return (
		<div>
			{/*<div>*/}
			{/*	<label>*/}
			{/*		ID:*/}
			{/*		<input*/}
			{/*			type="text"*/}
			{/*			value={id}*/}
			{/*			onChange={(e) => setId(e.target.value)}*/}
			{/*			placeholder="Enter ID"*/}
			{/*		/>*/}
			{/*	</label>*/}
			{/*</div>*/}
			<div>
				<h2>Tables</h2>
				{tables.map((table, index) => (
					<div key={index}>
						<label>
							Table {index + 1}:
							<input
								type="text"
								value={table}
								onChange={(e) => handleTableChange(index, e.target.value)}
								placeholder={`Enter Table ${index + 1}`}
							/>
						</label>
					</div>
				))}
				<button onClick={handleAddTable}>Add Table</button>
			</div>
			<button onClick={handleGenerateQrCodes}>Generate QR Codes</button>

			{!qrCodes.length && (
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

			{qrCodes.length > 0 && (
				<div>
					<h2>Generated QR Codes</h2>
					{qrCodes.map((qrCode, index) => (
						<div key={index}>
							<h3>Table {qrCode.table}</h3>
							<img
								src={qrCode.qrCodeData}
								alt={`QR Code for Table ${qrCode.table}`}
							/>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default QrCodeManager;
