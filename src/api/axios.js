import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3003/api",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
	},
});

axiosInstance.interceptors.request.use(
	(config) => {
		const token = Cookies.get("authToken");

		console.log(token);

		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}

		console.log('config', config);

		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axiosInstance;