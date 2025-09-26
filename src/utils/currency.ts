export const formatAsCurrency = (value: string | null | undefined): string => {
  if (!value) return "";

  // Sadece rakam ve virgül kalsın
  const clean = value.replace(/[^0-9,]/g, "");
  if (!clean) return "";

  // integer ve decimal ayır
  const [integerPart, decimalPart] = clean.split(",");

  // integer kısmı formatla
  const n = Number(integerPart || "0");
  const formattedInt = new Intl.NumberFormat("tr-TR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(n);

  // decimal kısmı varsa ekle
  return decimalPart !== undefined
    ? `${formattedInt},${decimalPart}`
    : formattedInt;
};

export const normalizeForDB = (value: string | null | undefined): number | null | string => {
  if (!value) return null;

  const noThousands = value.replace(/\./g, "");

  const standardized = noThousands.replace(",",".");

  const num = parseFloat(standardized);

  return isNaN(num) ? "" : num;
};
