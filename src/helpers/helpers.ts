const currencySignMap: Record<string, string> = {
  USD: "\u0024",
  POUND: "\u00A3",
  EURO: "\u20AC",
  ROUBLE: "\u20BD",
}

// TODO: remove this when intl implemented
export const getCurrencySign = (currency: string) =>
  currencySignMap[currency] ?? ""
