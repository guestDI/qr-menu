import "../../styles/globals.css"
import type { AppProps } from "next/app"
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
