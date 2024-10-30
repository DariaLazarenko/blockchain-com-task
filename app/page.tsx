import EmptyState from "@/components/EmptyState";
import { getCoinList } from "@/actions/getCoinList";
import CoinTable from "@/components/CoinTable";

export default async function Home() {
  const coinListData = await getCoinList();

  return (
    <main className="h-full flex flex-col lg:px-48">
      <h3 className="py-4 px-5">Available cryptocurrencies:</h3>
      {!coinListData.length && <EmptyState />}
      {!!coinListData.length && <CoinTable coinListData={coinListData} />}
    </main>
  );
}
