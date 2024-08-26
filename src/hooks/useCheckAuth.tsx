import { useEffect } from "react";
import { NextRouter, useRouter } from "next/router";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../api/axios";

interface DecodedToken {
	exp: number;
}

const isTokenExpired = (token: string): boolean => {
	const decoded: DecodedToken = jwtDecode(token);
	return decoded.exp * 1000 < Date.now();
};

const checkAuthToken = async (router: NextRouter | string[]) => {
	const token = Cookies.get("authToken");

	if (token) {
		if (isTokenExpired(token)) {
			const refreshToken = Cookies.get("refreshToken");

			if (refreshToken) {
				try {
					const { data } = await axiosInstance.post("/auth/token", {
						token: refreshToken,
					});
					Cookies.set("authToken", data.accessToken);
					// eslint-disable-next-line @typescript-eslint/no-unused-vars
				} catch (_) {
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

const useCheckAuth = () => {
	const router = useRouter();

	useEffect(() => {
		checkAuthToken(router);
	}, [router]);
};

export default useCheckAuth;
