import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = Cookies.get("authToken");

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				const { data } = await axiosInstance.post("/token");
				Cookies.set("authToken", data.token);

				originalRequest.headers.Authorization = `Bearer ${data.token}`;
				return axiosInstance(originalRequest);
			} catch (err) {
				const router = useRouter();
				router.push("/login");
				return Promise.reject(err);
			}
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
