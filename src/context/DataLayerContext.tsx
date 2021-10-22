import React, { useContext, useMemo, useState } from "react"
import menu from "../../__fixtures__/menu.json"
import { CartMenuItem, ShoppingCartItem } from "../model/types"

interface DataLayerContextProviderProps {
	children: React.ReactNode
}

interface DataLayerCtx {
	items: any
	shoppingCart: CartMenuItem[]
	grouppedCardItems: Record<any, any>
	addItemToShoppingCart: (value: CartMenuItem) => void
}

const DataLayerContext = React.createContext<DataLayerCtx>({
	items: [],
	shoppingCart: [],
	grouppedCardItems: {},
	addItemToShoppingCart: () => {},
})

export const useDataLayerContext = () => useContext(DataLayerContext)

export const DataLayerContextProvider: React.FC<DataLayerContextProviderProps> =
	({ children }) => {
		const [shoppingCart, setShoppingCart] = useState<CartMenuItem[]>([])

		// TODO: remove with real data from server
		const itemsF = useMemo(() => [...menu], [menu])

		// const itemsList = itemsF.find()

		const grouppedCardItems = useMemo(() => {
			return shoppingCart.reduce((accum: any, item: any) => {
				const categoryItems: any =
					itemsF.find((itemF) => itemF.category === item.category)?.items || []
				const itemInCategory: ShoppingCartItem = categoryItems.find(
					(categoryItem: any) => categoryItem.uid === item.uid
				)

				if (accum[item.uid]) {
					const countF = accum[item.uid].count

					accum[item.uid] = {
						...accum[item.uid],
						count: countF + 1,
					}
				} else {
					accum[itemInCategory.uid] = {
						category: item.category,
						uid: itemInCategory.uid,
						name: itemInCategory.name,
						price: itemInCategory.price,
						priceCurrency: itemInCategory.priceCurrency,
						count: 1,
					}
				}

				return accum
			}, {})
		}, [shoppingCart, itemsF])

		const addItemToShoppingCart = (val: CartMenuItem) => {
			// console.log(val)
			setShoppingCart((prevValue) => [...prevValue, val])
		}

		const ctx = {
			items: itemsF,
			shoppingCart,
			addItemToShoppingCart,
			grouppedCardItems,
		}

		return (
			<DataLayerContext.Provider value={ctx}>
				{children}
			</DataLayerContext.Provider>
		)
	}
