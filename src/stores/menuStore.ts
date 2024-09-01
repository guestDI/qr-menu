import { create } from "zustand";

export interface MenuItem {
	id: string;
	username: string;
	role: string;
	email: string;
}

interface MenuStore {
	menuData: MenuItem[];
	setMenuData: (data: MenuItem[]) => void;
	addMenuItem: (newMember: MenuItem) => void;
	removeMenuItem: (id: string) => void;
	updateMenuItem: (updatedMember: MenuItem) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
	menuData: [],
	setMenuData: (data) => set({ menuData: data }),
	addMenuItem: (newMember) =>
		set((state) => ({
			menuData: [...state.menuData, newMember],
		})),
	removeMenuItem: (id) =>
		set((state) => ({
			menuData: state.menuData.filter((staff) => staff.id !== id),
		})),
	updateMenuItem: (updatedMember) =>
		set((state) => ({
			menuData: state.menuData.map((staff) =>
				staff.id === updatedMember.id ? updatedMember : staff
			),
		})),
}));

export default useMenuStore;
