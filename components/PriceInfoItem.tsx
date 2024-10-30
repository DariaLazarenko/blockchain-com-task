import { NumberFormatter } from "@/utils/numberFormatter";

interface Props {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
}

export default function PriceInfoItem({ label, value, prefix, suffix }: Props) {
  return (
    <div className="text-center">
      <p className="text-gray-600">{label}</p>
      <p className="text-lg sm:text-xl font-semibold">
        {prefix ?? ""}
        {NumberFormatter.formatToSignificantDecimals(value)}
        {suffix ?? ""}
      </p>
    </div>
  );
}
