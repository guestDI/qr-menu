import { QRCodeCanvas } from "qrcode.react";

const QRCodeGenerator = ({ url }: { url: string }) => {
	return (
		<QRCodeCanvas
			value={url}
			size={160}
			bgColor={"#ffffff"}
			fgColor={"#000000"}
			level={"H"}
			marginSize={2}
		/>
	);
};

export default QRCodeGenerator;
