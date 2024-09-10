import { create } from "zustand";

export interface Order {
	id: string;
	username: string;
	role: string;
	email: string;
}

interface StaffStore {
	orderData: Order[];
	setOrderData: (data: Order[]) => void;
	removeOrder: (id: string) => void;
	updateOrder: (updatedOrder: Order) => void;
}

const useOrderStore = create<StaffStore>((set) => ({
	orderData: [], // Changed from ordersData to orderData
	setOrderData: (data) => set({ orderData: data }), // Changed from ordersData to orderData
	removeOrder: (id) =>
		set((state) => ({
			orderData: state.orderData.filter((order) => order.id !== id), // Changed from ordersData to orderData
		})),
	updateOrder: (updatedOrder) =>
		set((state) => ({
			orderData: state.orderData.map((order) =>
				order.id === updatedOrder.id ? updatedOrder : order
			),
		})),
}));

export default useOrderStore;
