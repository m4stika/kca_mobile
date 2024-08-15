export const formatCurrency = (number: number = 0, decimalCount = 0) => {
  if (!number) return "0\xa0";
  const newNumber = typeof number === "string" ? Number(number) : number;
  // console.log("number", number);
  // const newNumber = number;
  const isNegative = number < 0;

  const result =
    new Intl.NumberFormat("id-ID", {
      // style: "currency",
      // currency: "IDR",
      currencySign: "accounting",
      minimumFractionDigits: decimalCount,
    }).format(Math.abs(newNumber)) || "0";
  return isNegative ? `(${result})` : `${result}\xa0`;
  // return result;
};

const currencies = {
  USD: "$",
  EUR: "€",
  IDR: "Rp",
  NONE: "",
};
type Curr = keyof typeof currencies;
type Options = {
  currency?: Curr;
  precision?: number;
  locale?: string;
  negativePrefix?: string;
  negativeSuffix?: string;
};
export function formatCurrency2(initialValue: number = 0, options?: Options): string {
  const defaultOptions: Required<Options> = {
    currency: "NONE" as Curr,
    precision: 2,
    locale: "id-ID",
    negativePrefix: "(",
    negativeSuffix: ")",
  };
  const { currency, precision, locale, negativePrefix, negativeSuffix } = Object.assign(
    defaultOptions,
    options
  );

  const isNegative = initialValue < 0;
  const absValue = initialValue < 0 ? Math.abs(initialValue) : initialValue;

  const str = String(absValue);

  const splited = str.split(".");
  const cents =
    splited.length > 1 ? String(splited[1]).padEnd(precision, "0") : "0".repeat(precision);
  const value = splited[0];

  var chunks: string[] = [];

  for (let i = value.length; i > 0; i -= 3) {
    chunks.push(value.substring(i, i - 3));
  }

  chunks.reverse();

  switch (locale) {
    case "id-ID":
      return `${currencies[currency]} ${isNegative ? negativePrefix : " "}${chunks.join(".")}${precision > 0 ? "," + cents : ""
        }${isNegative ? negativeSuffix : "\xa0"}`;
    default:
      return `${currencies[currency]} ${chunks.join(",")}${precision > 0 ? "." + cents : ""}`;
  }
}
