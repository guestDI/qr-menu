import React from "react";

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

export type SocialNetwork = "twitter" | "instagram" | "facebook" | "linkedIn";

export type SocialContacts = Array<Record<SocialNetwork, string>>;

export type CustomEvent = {
	preventDefault: () => void;
	target: { value: React.SetStateAction<string> };
};

export interface EntityBox {
	imgUri: string;
	title: string;
	description: string;
}
