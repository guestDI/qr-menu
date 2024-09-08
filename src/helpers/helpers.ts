const currencySignMap: Record<string, string> = {
	USD: "\u0024",
	POUND: "\u00A3",
	EURO: "\u20AC",
	ROUBLE: "\u20BD",
};

// TODO: remove this when intl implemented
export const getCurrencySign = (currency: string) =>
	currencySignMap[currency] ?? "";

export async function hashValue(value: string) {
	const encoder = new TextEncoder();
	const data = encoder.encode(value);
	const hash = await crypto.subtle.digest("SHA-256", data);
	return Array.from(new Uint8Array(hash))
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}
