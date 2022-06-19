import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import type { AppProps } from "next/app"
config.autoAddCss = false

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
