import { CoinShort } from "@/models/coin";
import { NumberFormatter } from "@/utils/numberFormatter";
import Link from "next/link";

interface Props {
  coinListData: CoinShort[];
}

export default function CoinTable({ coinListData }: Props) {
  return (
    <div
      className="p-4 pt-0"
      aria-label="Table of availabe cryptocurrencies with name, price and 24hr price percentage change"
    >
      <table className="min-w-full text-left text-sm bg-white shadow rounded-xl">
        <thead className="border-b">
          <tr>
            <th className="px-2 sm:px-6 py-2 sm:py-4">Name</th>
            <th className="px-2 sm:px-6 py-2 sm:py-4">Price</th>
            <th className="px-2 sm:px-6 py-2 sm:py-4">24h</th>
          </tr>
        </thead>
        <tbody>
          {coinListData.map((coin: CoinShort) => (
            <tr
              key={coin.id}
              className="border-b last:border-b-0 transition duration-300 ease-in-out hover:bg-blue-50"
            >
              <td className="whitespace-nowrap cursor-pointer hover:underline">
                <Link
                  href={`/coins/${coin.id}`}
                  className="flex w-full px-2 sm:px-6 py-2 sm:py-4"
                  aria-label={`View details for ${coin.name}`}
                >
                  {coin.name}
                </Link>
              </td>
              <td className="whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4">
                ${NumberFormatter.formatToSignificantDecimals(coin.usdPrice)}
              </td>
              <td
                className={`whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4 ${
                  coin.usd24hChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {coin.usd24hChange.toFixed(2)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
