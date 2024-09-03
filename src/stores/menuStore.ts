import { create } from "zustand";
import { IMenu } from "@/model/types";

interface MenuStore {
	menuData: IMenu[];
	setMenuData: (data: IMenu[]) => void;
	addMenuItem: (newMenuItem: IMenu) => void;
	removeMenuItem: (id: string) => void;
	updateMenuItem: (updatedMenu: IMenu) => void;
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
