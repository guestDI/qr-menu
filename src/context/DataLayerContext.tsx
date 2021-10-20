import React, { useCallback, useContext, useMemo, useState } from "react"
import menu from "../../__fixtures__/menu.json"
import { CartItemType } from "../model/types"

interface DataLayerContextProviderProps {
	children: React.ReactNode
}

interface DataLayerCtx {
	items: any
	shoppingCart: Array<CartItemType>
	addItemToShoppingCart: (value: CartItemType) => void
}

const DataLayerContext = React.createContext<DataLayerCtx>({
	items: [],
	shoppingCart: [],
	addItemToShoppingCart: () => {},
})

export const useDataLayerContext = () => useContext(DataLayerContext)

export const DataLayerContextProvider: React.FC<DataLayerContextProviderProps> =
	({ children }) => {
		const [shoppingCart, setShoppingCart] = useState<Array<CartItemType>>([])

		const itemsF = useMemo(() => [...menu], [menu])

		const addItemToShoppingCart = useCallback(
			(val: CartItemType) => {
				setShoppingCart((prevValue) => [...prevValue, val])
			},
			[shoppingCart]
		)

		const ctx = {
			items: itemsF,
			shoppingCart,
			addItemToShoppingCart,
		}

		return (
			<DataLayerContext.Provider value={ctx}>
				{children}
			</DataLayerContext.Provider>
		)
	}
