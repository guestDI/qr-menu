import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { NextRouter, useRouter } from "next/router";
import { useEffect } from "react";
import axiosInstance from "../api/axios";

interface DecodedToken {
	exp: number;
}

const isTokenExpired = (token: string): boolean => {
	const decoded: DecodedToken = jwtDecode(token);
	return decoded.exp * 1000 < Date.now();
};

const authFreeRoutes = ["/login", "/register", "/public-page"];

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
				} catch (_) {
					router.push("/login");
				}
			} else {
				router.push("/login");
			}
		} else {
			try {
				const { data: user } = await axiosInstance.get("users/auth/me", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				if (!user) {
					Cookies.remove("authToken");
					Cookies.remove("refreshToken");
					router.push("/login");
				}
			} catch (error) {
				Cookies.remove("authToken");
				Cookies.remove("refreshToken");
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
		if (authFreeRoutes.includes(router.pathname)) {
			return;
		}

		checkAuthToken(router);
	}, [router]);
};

export default useCheckAuth;
