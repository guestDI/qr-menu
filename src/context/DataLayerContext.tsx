import React, { useCallback, useContext, useMemo, useState } from "react";
import menu from "../../__fixtures__/menu.json";
import { CartMenuItem, ShoppingCartItem } from "../model/types";

interface DataLayerContextProviderProps {
	children: React.ReactNode;
}

interface DataLayerCtx {
	items: any;
	shoppingCart: CartMenuItem[];
	grouppedCardItems: Record<any, any>;
	addItemToShoppingCart: (value: CartMenuItem) => void;
	removeItemFromShoppingCart: (uid: string) => void;
	decreaseItemCount: (uid: string) => void;
	clearShoppingCart: () => void;
	total: number;
}

const DataLayerContext = React.createContext<DataLayerCtx>({
	items: [],
	shoppingCart: [],
	grouppedCardItems: {},
	addItemToShoppingCart: () => {},
	removeItemFromShoppingCart: () => {},
	decreaseItemCount: () => {},
	clearShoppingCart: () => {},
	total: 0,
});

export const useDataLayerContext = () => useContext(DataLayerContext);

export const DataLayerContextProvider: React.FC<
	DataLayerContextProviderProps
> = ({ children }) => {
	const [shoppingCart, setShoppingCart] = useState<CartMenuItem[]>([]);

	// TODO: remove with real data from server
	const itemsF = useMemo(() => [...menu], [menu]);

	const grouppedCardItems = useMemo(() => {
		return shoppingCart.reduce((accum: any, item: any) => {
			const categoryItems: any =
				itemsF.find((itemF) => itemF.category === item.category)?.items || [];
			const itemInCategory: ShoppingCartItem = categoryItems.find(
				(categoryItem: any) => categoryItem.uid === item.uid
			);

			if (accum[item.uid]) {
				const countF = accum[item.uid].count;

				accum[item.uid] = {
					...accum[item.uid],
					count: countF + 1,
				};
			} else {
				accum[itemInCategory.uid] = {
					category: item.category,
					uid: itemInCategory.uid,
					name: itemInCategory.name,
					price: itemInCategory.price,
					priceCurrency: itemInCategory.priceCurrency,
					count: 1,
				};
			}

			return accum;
		}, {});
	}, [shoppingCart, itemsF]);

	const addItemToShoppingCart = useCallback((val: CartMenuItem) => {
		setShoppingCart((prevValue) => [...prevValue, val]);
	}, []);

	const removeItemFromShoppingCart = useCallback((uid: string) => {
		setShoppingCart((prevState: CartMenuItem[]) =>
			prevState.filter((itemCart) => itemCart.uid !== uid)
		);
	}, []);

	const decreaseItemCount = useCallback(
		(uid: string) => {
			const itemIndex = shoppingCart.findIndex(
				(item: CartMenuItem) => item.uid === uid
			);

			if (itemIndex >= 0) {
				const modifiedArray = [...shoppingCart];
				modifiedArray.splice(itemIndex, 1);

				setShoppingCart(modifiedArray);
			}
		},
		[shoppingCart]
	);

	const clearShoppingCart = useCallback(() => {
		setShoppingCart([]);
	}, []);

	const total = useMemo(
		() =>
			Object.values(grouppedCardItems).reduce(
				(accum: number, item: any) => accum + item.count * item.price,
				0
			),
		[grouppedCardItems]
	);

	const ctx = {
		items: itemsF,
		shoppingCart,
		addItemToShoppingCart,
		removeItemFromShoppingCart,
		decreaseItemCount,
		clearShoppingCart,
		grouppedCardItems,
		total,
	};

	return (
		<DataLayerContext.Provider value={ctx}>
			{children}
		</DataLayerContext.Provider>
	);
};
