import { getCoinDetails } from "@/actions/getCoinDetails";
import EmptyState from "@/components/EmptyState";
import PriceInfoItem from "@/components/PriceInfoItem";
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

export default async function CoinDetailsPage({ params }: Props) {
  // New data will be fetched each time user loads a page because it is a dymanic route
  const coinDetails: Coin = await getCoinDetails(params.id);
  const currentDateTime =
    new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString();

  if (!coinDetails) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center">
      <div className="max-w-sm sm:max-w-lg">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2 sm:mb-4 text-center">
          {coinDetails.name}
        </h1>
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
          Last fetched {currentDateTime}
        </h2>

        <div className="bg-white shadow rounded-lg p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            <PriceInfoItem
              label="Current Price"
              value={coinDetails.usdPrice}
              prefix="$"
            />

            <PriceInfoItem
              label="24h High"
              value={coinDetails.usd24hHigh}
              prefix="$"
            />

            <PriceInfoItem
              label="24h Low"
              value={coinDetails.usd24hLow}
              prefix="$"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
