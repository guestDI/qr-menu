import type { AppProps } from "next/app"
import "../../styles/globals.css"
import "../../styles/utilities.css"
import { DataLayerContextProvider } from "../context/DataLayerContext"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DataLayerContextProvider>
			<Component {...pageProps} />
		</DataLayerContextProvider>
	)
}
export default MyApp
