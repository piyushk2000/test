export const price_per_hour_currency_values = [
  {
    value: "INR",
    label: "Indian Rupee (INR)",
  },
  {
    value: "USD",
    label: "US Dollar (USD)",
  },
  {
    value: "EUR",
    label: "Euro (EUR)",
  },
  {
    value: "JPY",
    label: "Japanese Yen (JPY)",
  },
  {
    value: "GBP",
    label: "Pound Sterling (GBP)",
  },
  {
    value: "AUD",
    label: "Australian Dollar (AUD)",
  },
  {
    value: "CAD",
    label: "Canadian Dollar (CAD)",
  },
  {
    value: "CHF",
    label: "Swiss Franc (CHF)",
  },
  {
    value: "SGD",
    label: "Singapore Dollar (SGD)",
  },
  {
    value: "HKD",
    label: "Hong Kong Dollar (HKD)",
  },
  {
    value: "AED",
    label: "UAE Dirham (AED)",
  },
  {
    value: "IDR",
    label: "Indonesia Rupiah (IDR)",
  },
  {
    value: "BDT",
    label: "Bangladesh Taka (BDT)",
  },
  {
    value: "IMP",
    label: "Isle of Man Pound (IMP)",
  },
  {
    value: "ZAR",
    label: "South Africa Rand (ZAR)",
  },
];

export function getCurrencyValue(value: string | null) {
  if (!value) {
    return null;
  }

  return price_per_hour_currency_values.find((v) => {
    if (v.value === value) {
      return true;
    } else {
      return false;
    }
  });
}
