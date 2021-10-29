import type { AppProps } from "next/app"
import "../../styles/globals.css"
import "../../styles/utilities.css"
import { Layout } from "../components"
import { DataLayerContextProvider } from "../context/DataLayerContext"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Layout>
			<DataLayerContextProvider>
				<Component {...pageProps} />
			</DataLayerContextProvider>
		</Layout>
	)
}
export default MyApp
