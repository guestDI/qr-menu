import { create } from "zustand";

interface QRCode {
	table: number;
	url: string;
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
