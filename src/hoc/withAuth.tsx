import React, { ComponentType, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

interface WithAuthProps {
	role: string;
}

interface DecodedToken {
	exp: number;
	role: string;
}

const getUserRole = (token: string): string => {
	const decoded = jwtDecode<DecodedToken>(token);
	return decoded.role;
};

const withAuth = <P extends WithAuthProps>(
	WrappedComponent: ComponentType<P>
): React.FC<Omit<P, "role">> => {
	return (props) => {
		const [role, setRole] = useState<string | null>(null);

		useEffect(() => {
			const token = Cookies.get("authToken");

			if (!token) {
				return;
			}
			setRole(getUserRole(token || ""));
		}, []);

		if (role === null) {
			return null;
		}

		return <WrappedComponent {...(props as P)} role={role} />;
	};
};

export default withAuth;
