import { useEffect, useState } from "react";

interface ScreenResolution {
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
}

const useScreenResolution = (): ScreenResolution => {
	const [screenResolution, setScreenResolution] = useState<ScreenResolution>({
		isMobile: false,
		isTablet: false,
		isDesktop: false,
	});

	const checkScreenSize = () => {
		const isMobile = window.matchMedia("(max-width: 767px)").matches;
		const isTablet = window.matchMedia(
			"(min-width: 768px) and (max-width: 1024px)"
		).matches;
		const isDesktop = window.matchMedia("(min-width: 1025px)").matches;

		setScreenResolution({
			isMobile,
			isTablet,
			isDesktop,
		});
	};

	useEffect(() => {
		checkScreenSize(); // Initial check on mount

		window.addEventListener("resize", checkScreenSize); // Listen for resize events

		return () => window.removeEventListener("resize", checkScreenSize); // Clean up event listener on unmount
	}, []);

	return screenResolution;
};

export default useScreenResolution;
