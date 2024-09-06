import { IMenu } from "@/model/types";
import { create } from "zustand";

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
	addMenuItem: (newItems) =>
		set((state) => {
			const existingMenu = state.menuData.find(
				(menu) => menu.placeId === placeId
			);
			if (existingMenu) {
				return {
					menuData: state.menuData.map((menu) =>
						menu.placeId === placeId
							? { ...menu, menuItems: [...menu.menuItems, newItem] }
							: menu
					),
				};
			} else {
				return {
					menuData: [...state.menuData, { placeId, menuItems: [newItem] }],
				};
			}
		}),
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
