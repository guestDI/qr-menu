import { config } from "@fortawesome/fontawesome-svg-core"
import "@fortawesome/fontawesome-svg-core/styles.css"
import type { AppProps } from "next/app"
config.autoAddCss = false

import "../../styles/faq.scss"
import "../../styles/globals.scss"
import "../../styles/utilities.scss"
import { DataLayerContextProvider } from "../context/DataLayerContext"

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<DataLayerContextProvider>
			<Component {...pageProps} />
		</DataLayerContextProvider>
	)
}
export default MyApp
