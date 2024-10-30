import { getCoinDetails } from "@/actions/getCoinDetails";
import CoinDetails from "@/components/CoinDetails";
import EmptyState from "@/components/EmptyState";
import { Coin } from "@/models/coin";

interface Props {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: Props) {
  const coinDetails: Coin = await getCoinDetails(params.id);

  if (!coinDetails) {
    return {
      title: "Coin Not Found",
      description: "The requested cryptocurrency could not be found.",
    };
  }

  return {
    title: `${coinDetails.name} Price and Details`,
    description: `Current ${
      coinDetails.name
    } price: $${coinDetails.usdPrice.toFixed(
      2,
    )} | 24h change: ${coinDetails.usd24hChange.toFixed(2)}%`,
    keywords: [
      `${coinDetails.name}`,
      "cryptocurrency",
      "digital currency",
      "crypto details",
    ],
    openGraph: {
      title: `${coinDetails.name} Price and Details`,
      description: `Current ${
        coinDetails.name
      } price: $${coinDetails.usdPrice.toFixed(
        2,
      )} | 24h change: ${coinDetails.usd24hChange.toFixed(2)}%`,
      type: "website",
    },
  };
}

// New page will be rendered each time user loads a page because it is a dymanic route
export default async function CoinDetailsPage({ params }: Props) {
  const coinDetails: Coin = await getCoinDetails(params.id);

  if (!coinDetails) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <EmptyState />
      </div>
    );
  }

  return <CoinDetails coinId={params.id} initialData={coinDetails} />;
}
