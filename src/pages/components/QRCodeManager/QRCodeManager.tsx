import { CustomEvent } from "@/model/types";
import useQrCodeStore from "@/stores/codeStore";
import useUserStore from "@/stores/userStore";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import Button from "../../../components/Button/Button";
import Input from "../../../components/Input/Input";
import ClearIcon from "../../../inline-img/svg/clear.svg";
import GenerateIcon from "../../../inline-img/svg/generate.svg";
import PrintIcon from "../../../inline-img/svg/print.svg";
import QrCodeIcon from "../../../inline-img/svg/qr-code.svg";
import QRCodeGenerator from "./QRCodeGenerator/QRCodeGenerator";
import styles from "./styles.module.scss";

const QrCodeManager = () => {
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

	const handleGenerateQrCodes = () => {
		const tables = [];
		if (toTable) {
			for (let i = fromTable; i <= toTable; i++) {
				tables.push(i);
			}
		} else {
			tables.push(fromTable);
		}

		const generatedQrCodes = tables.map((table) => ({
			table: table,
			url: `${process.env.NEXT_PUBLIC_BASE_URL}/${user?.organizationId}/menu?table=${table}`,
		}));

		setQrCodes(generatedQrCodes);
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
				<h2>Codes</h2>
				<div className={styles.inputGroup}>
					<Input
						name="from"
						type="text"
						placeholder="From"
						size="lg"
						onChange={handleFromTableChange}
					/>
					<Input
						name="to"
						type="text"
						placeholder="To"
						size="lg"
						onChange={handleToTableChange}
					/>
					<Button className={styles.btn} onClick={handleGenerateQrCodes}>
						{GenerateIcon ? (
							<Image src={GenerateIcon} alt="generate" width={20} height={20} />
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
									<Image src={ClearIcon} alt="clear" width={25} height={25} />
								) : (
									"Clear"
								)}
							</Button>
						</div>
					)}
				</div>
			</div>

			<div ref={componentRef} className={styles.qrCodesContainer}>
				{qrCodes.length > 0 ? (
					<div className={styles.qrGridWrapper}>
						{qrCodes.map((qrCode, index) => (
							<div key={index} className={styles.qrCodeItem}>
								<p>Table {qrCode.table}</p>
								<QRCodeGenerator url={qrCode.url} />
							</div>
						))}
					</div>
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
