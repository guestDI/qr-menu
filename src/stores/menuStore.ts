import { IMenu } from "@/model/types";
import { create } from "zustand";

interface MenuStore {
	menuData: IMenu[];
	setMenuData: (data: IMenu[]) => void;
	addMenuItem: (newMenuItem: IMenu[]) => void;
	removeMenuItem: (id: string) => void;
	updateMenuItem: (updatedMenu: IMenu) => void;
}

const useMenuStore = create<MenuStore>((set) => ({
	menuData: [],
	setMenuData: (data) => set({ menuData: data }),
	addMenuItem: (newItems: IMenu[]) =>
		set((state) => {
			const updatedMenuData = state.menuData.map((categoryData) => {
				const matchingItems = newItems.filter(
					(item) => item.category === categoryData.category
				);

				if (matchingItems.length > 0) {
					return {
						...categoryData,
						items: [...categoryData.items, ...matchingItems],
					};
				}

				return categoryData;
			});

			const newCategories = newItems.reduce((acc: any[], newItem) => {
				const existingCategory = state.menuData.find(
					(categoryData) => categoryData.category === newItem.category
				);

				if (!existingCategory) {
					const newCategory = acc.find(
						(cat) => cat.category === newItem.category
					);

					if (newCategory) {
						newCategory.items.push(newItem);
					} else {
						acc.push({
							category: newItem.category,
							items: [newItem],
						});
					}
				}

				return acc;
			}, []);

			return {
				menuData: [...updatedMenuData, ...newCategories],
			};
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
