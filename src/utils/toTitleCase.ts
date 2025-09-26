import { tr } from "@/constants/lang/tr";

export const toTitleCase = (val: string) => {
  if (!val) return tr["Değer bulunamadı."];
  return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
};
