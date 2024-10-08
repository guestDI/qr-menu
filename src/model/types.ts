import React from "react";

export interface IMenuItem {
	id?: string;
	category: string;
	currency?: string;
	description: string;
	image?: string;
	price: number;
	title: string;
}

export interface IMenu {
	category: string;
	items: IMenuItem[];
}

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

export interface IEntityData {
	imgUri: string;
	title: string;
	description: string;
}

export interface IFaqData {
	rows: Array<{ title: string; content: string }>;
}

export interface IDecodedToken {
	id: string;
	role: string;
	organizationId: string;
}
