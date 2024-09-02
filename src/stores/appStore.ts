import { create } from "zustand";

interface PreviewState {
	isPreviewOpen: boolean;
	openPreview: () => void;
	closePreview: () => void;
	togglePreview: () => void;
}

const useAppStore = create<PreviewState>((set) => ({
	isPreviewOpen: false,
	openPreview: () => set({ isPreviewOpen: true }),
	closePreview: () => set({ isPreviewOpen: false }),
	togglePreview: () =>
		set((state) => ({ isPreviewOpen: !state.isPreviewOpen })),
}));

export default useAppStore;
