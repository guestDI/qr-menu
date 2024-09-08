import { create } from "zustand";

interface CartItem {
	uid: string;
	count: number;
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
				(item) => item.uid === newItem.uid
			);
			if (existingItemIndex !== -1) {
				// If item already exists, increase its count
				const updatedCart = [...state.cart];
				updatedCart[existingItemIndex] = {
					...updatedCart[existingItemIndex],
					count: updatedCart[existingItemIndex].count + 1,
				};
				return { cart: updatedCart };
			} else {
				// If item is new, add it to the cart
				return { cart: [...state.cart, { ...newItem, count: 1 }] };
			}
		}),
	removeItemFromShoppingCart: (uid: string) =>
		set((state) => ({
			cart: state.cart.filter((item) => item.uid !== uid),
		})),
	decreaseItemCount: (uid: string) =>
		set((state) => ({
			cart: state.cart
				.map((item) =>
					item.uid === uid
						? { ...item, count: Math.max(0, item.count - 1) }
						: item
				)
				.filter((item) => item.count > 0),
		})),
	clearShoppingCart: () => set({ cart: [] }),
}));

export default useCartStore;
