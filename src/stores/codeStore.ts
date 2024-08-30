import { create } from "zustand";

interface QRCode {
	table: string;
	qrCodeData: string;
}

interface QRCodeStore {
	qrCodes: QRCode[];
	setQrCodes: (qrCodes: QRCode[]) => void;
	clearQrCodes: () => void;
}

const useQrCodeStore = create<QRCodeStore>((set) => ({
	qrCodes: [],
	setQrCodes: (qrCodes) => set({ qrCodes }),
	clearQrCodes: () => set({ qrCodes: [] }),
}));

export default useQrCodeStore;
