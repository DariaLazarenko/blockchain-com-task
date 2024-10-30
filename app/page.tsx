import { CoinShort } from "@/models/coin";
import EmptyState from "@/components/EmptyState";
import { getCoinList } from "@/services/coinListPageService";
import { NumberFormatter } from "@/utils/numberFormatter";
import Link from "next/link";

export default async function CoinListPage() {
  const coinListData = await getCoinList();

  return (
    <main className="h-full flex flex-col lg:px-36">
      <h3 className="py-4 px-5">Available cryptocurrencies:</h3>
      {!coinListData.length && <EmptyState />}
      {!!coinListData.length && (
        <div
          className="p-4 pt-0"
          aria-label="Table of availabe cryptocurrencies with name, price and 24hr price percentage change"
        >
          <table className="min-w-full text-left text-sm bg-white rounded-xl">
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
                  <td className="whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4 cursor-pointer hover:underline">
                    <Link
                      href={`/coins/${coin.id}`}
                      className="flex w-full"
                      aria-label={`View details for ${coin.name}`}
                    >
                      {coin.name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4">
                    $
                    {NumberFormatter.formatToSignificantDecimals(coin.usdPrice)}
                  </td>
                  <td
                    className={`whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4 ${
                      coin.usd24hChange > 0 ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {coin.usd24hChange.toFixed(2)}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
