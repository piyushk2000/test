import { CURRENCIES } from "../../../constants/currencies";


export const currenciesList = [
  {label: "All", value: "all"},
  ...Object.keys(CURRENCIES).filter(c => c !== "INR").map((c) => ({label: c, value: c}))
]