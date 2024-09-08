import type { AppProps } from "next/app";
// import { Head } from "next/document";
import Head from "next/head";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/admin.scss";
import "../../styles/faq.scss";
import "../../styles/globals.scss";
import "../../styles/registration.scss";
import "../../styles/utilities.scss";
import { DataLayerContextProvider } from "../context/DataLayerContext";

function MyApp({ Component, pageProps }: AppProps) {
	// useCheckAuth();

	return (
		<DataLayerContextProvider>
			<Head>
				<title>Quick menu</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
				<link
					href="https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
					rel="stylesheet"
				/>
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Component {...pageProps} />
		</DataLayerContextProvider>
	);
}

export default MyApp;
