import { create } from "zustand";

export interface CartItem {
	id: string;
	title: string;
	price: number;
	quantity: number;
	image: string;
	// Add other necessary properties
}

interface CartState {
	cart: CartItem[];
	addItemToShoppingCart: (item: CartItem) => void;
	removeItemFromShoppingCart: (uid: string) => void;
	decreaseItemCount: (uid: string) => void;
	clearShoppingCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
	cart: [],
	addItemToShoppingCart: (newItem: CartItem) =>
		set((state) => {
			const existingItemIndex = state.cart.findIndex(
				(item) => item.id === newItem.id
			);
			if (existingItemIndex !== -1) {
				// If item already exists, increase its count
				const updatedCart = [...state.cart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					quantity: updatedCart[existingItemIndex].quantity + 1,
				};
				return { cart: updatedCart };
			} else {
				// If item is new, add it to the cart
				return { cart: [...state.cart, { ...newItem, quantity: 1 }] };
			}
		}),
	removeItemFromShoppingCart: (id: string) =>
		set((state) => ({
			cart: state.cart.filter((item) => item.id !== id),
		})),
	decreaseItemCount: (id: string) =>
		set((state) => ({
			cart: state.cart
				.map((item) =>
					item.id === id
						? { ...item, quantity: Math.max(0, item.quantity - 1) }
						: item
				)
				.filter((item) => item.quantity > 0),
		})),
	clearShoppingCart: () => set({ cart: [] }),
}));

export default useCartStore;
