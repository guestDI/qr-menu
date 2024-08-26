import type { AppProps } from "next/app";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import "../../styles/faq.scss";
import "../../styles/globals.scss";
import "../../styles/utilities.scss";
import "../../styles/registration.scss";
import "../../styles/admin.scss";
import { DataLayerContextProvider } from "../context/DataLayerContext";
import axiosInstance from "../api/axios";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();

	useEffect(() => {
		const checkAuthToken = async () => {
			const token = Cookies.get("authToken");

			if (token) {
				try {
					//replace it with jwtDecode?
					await axiosInstance.get("/auth/validate-token");
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (error) {
					const refreshToken = Cookies.get("refreshToken");

					if (refreshToken) {
						try {
							const { data } = await axiosInstance.post("/auth/token", {
								token: refreshToken,
							});
							Cookies.set("authToken", data.accessToken);
							// eslint-disable-next-line @typescript-eslint/no-unused-vars
						} catch (err) {
							router.push("/login");
						}
					} else {
						router.push("/login");
					}
				}
			} else {
				router.push("/login");
			}
		};

		checkAuthToken();
	}, [router]);

	return (
		<DataLayerContextProvider>
			<Component {...pageProps} />
		</DataLayerContextProvider>
	);
}
export default MyApp;
