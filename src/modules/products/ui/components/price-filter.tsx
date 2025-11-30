import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatAsCurrency } from "@/utils/currency";
import { ChangeEvent, useRef } from "react";

interface Props {
  minPrice?: string | null;
  maxPrice?: string | null;
  onMinPriceChange: (value: string) => void; // "1256,10" gibi string döner
  onMaxPriceChange: (value: string) => void;
}



export const PriceFilter = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: Props) => {
  const minRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  const handleChange =
    (setter: (v: string) => void) =>
    (e: ChangeEvent<HTMLInputElement>) => {
      // Sadece rakam ve virgül kalsın
      const val = e.target.value.replace(/[^0-9,]/g, "");
      setter(val);
    };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Minimum Price</Label>
        <Input
          ref={minRef}
          type="text"
          inputMode="decimal"
          placeholder="0"
          value={formatAsCurrency(minPrice ?? "")}
          onChange={handleChange(onMinPriceChange)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <Label className="font-medium text-base">Maksimum Price</Label>
        <Input
          ref={maxRef}
          type="text"
          inputMode="decimal"
          placeholder="∞"
          value={formatAsCurrency(maxPrice ?? "")}
          onChange={handleChange(onMaxPriceChange)}
        />
      </div>
    </div>
  );
};
