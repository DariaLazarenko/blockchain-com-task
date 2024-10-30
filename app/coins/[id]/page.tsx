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

  const title = `${coinDetails.name} Details`;
  const description = `Detailed price information`;

  return {
    title: title,
    description: description,
    keywords: [
      `${coinDetails.name}`,
      "cryptocurrency",
      "digital currency",
      "crypto details",
    ],
    openGraph: {
      title: title,
      description: description,
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
