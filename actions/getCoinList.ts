"use server";

import { AVAILABLE_COIN_IDS } from "@/models/availableCoinIds";
import { CoinShort } from "@/models/coin";

interface CoinListApiResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

/**
 * Fetches current price and 24-hour price change data for a predefined list of cryptocurrencies
 * from the CoinGecko API.
 * @returns {Promise<CoinShort[]>} Promise that resolves to an array of cryptocurrency objects containing ID, name, USD price, and 24-hour USD price change percentage
 * @throws Error If the API request fails
 */
export async function getCoinList(): Promise<CoinShort[]> {
  const url =
    process.env.COINGECKO_BASE_URL +
    "/simple/price?ids=" +
    AVAILABLE_COIN_IDS.join(",") +
    "&vs_currencies=usd&include_24hr_change=true";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": process.env.COINGECKO_API_KEY!,
    },
    next: { revalidate: 60 },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: CoinListApiResponse = await response.json();

    const coinListData = Object.entries(data).map(([id, values]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      usdPrice: values.usd,
      usd24hChange: values.usd_24h_change,
    }));

    return coinListData;
  } catch (error) {
    console.error("Error fetching coin list:", error);
    throw error;
  }
}
