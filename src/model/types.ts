export type CartMenuItem = {
	category: string;
	uid: string;
};

type CategoryItem = {
	uid: string;
	count: number;
};

export interface CartItemType {
	category: string;
	items: CategoryItem[];
}

export interface ShoppingCartItem {
	category: string;
	uid: string;
	name: string;
	price: number;
	priceCurrency: string;
	count: number;
}
