import React, { useContext } from "react"
import menu from "../../__fixtures__/menu.json"

interface DataLayerContextProviderProps {
	children: React.ReactNode
}

interface DataLayerCtx {
	items: any
}

const DataLayerContext = React.createContext<DataLayerCtx>({
	items: [],
})

export const useDataLayerContext = () => useContext(DataLayerContext)

export const DataLayerContextProvider: React.FC<DataLayerContextProviderProps> =
	({ children }) => {
		const ctx = {
			items: [...menu],
		}

		return (
			<DataLayerContext.Provider value={ctx}>{children}</DataLayerContext.Provider>
		)
	}
