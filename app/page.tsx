import { CryptocurrencyShort } from "@/models/cryptocurrency";
import EmptyState from "@/components/EmptyState";
import { getCryptocurrencyList } from "@/services/cryptocurrencyListPageService";

export default async function CryptocurrencyListPage() {
  const cryptoData = await getCryptocurrencyList();

  return (
    <main className="h-full flex flex-col">
      <h3 className="py-4 px-5">Available cryptocurrencies:</h3>
      {!cryptoData.length && <EmptyState />}
      {!!cryptoData.length && (
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
              {cryptoData.map((crypto: CryptocurrencyShort) => (
                <tr
                  key={crypto.id}
                  className="border-b last:border-b-0 transition duration-300 ease-in-out hover:bg-blue-50 cursor-pointer"
                >
                  <td className="whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4">
                    {crypto.name}
                  </td>
                  <td className="whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4">
                    ${crypto.usdPrice.toFixed(2)}
                  </td>
                  <td
                    className={`whitespace-nowrap px-2 sm:px-6 py-2 sm:py-4 ${
                      crypto.usd24hChange > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {crypto.usd24hChange.toFixed(2)}%
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
