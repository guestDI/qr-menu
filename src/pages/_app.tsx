import type { AppProps } from "next/app";

import "../../styles/faq.scss";
import "../../styles/globals.scss";
import "../../styles/utilities.scss";
import "../../styles/registration.scss";
import "../../styles/admin.scss";
import "react-toastify/dist/ReactToastify.css";
import { DataLayerContextProvider } from "../context/DataLayerContext";
import useCheckAuth from "../hooks/useCheckAuth";

function MyApp({ Component, pageProps }: AppProps) {
	useCheckAuth();

	return (
		<DataLayerContextProvider>
			<Component {...pageProps} />
		</DataLayerContextProvider>
	);
}

export default MyApp;
