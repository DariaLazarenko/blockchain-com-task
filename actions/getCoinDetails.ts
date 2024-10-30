"use server";

import { Coin } from "@/models/coin";

/**
 * Fetches detailed information about a specific cryptocurrency
 * @param id Coin ID
 * @returns {Promise<Coin>} Detailed coin information
 * @throws Error if the fetch fails or response is invalid
 */
export async function getCoinDetails(id: string): Promise<Coin> {
  const baseUrl = process.env.COINGECKO_BASE_URL;
  const apiKey = process.env.COINGECKO_API_KEY;

  if (!baseUrl || !apiKey) {
    throw new Error(
      "Missing environment variables: COINGECKO_BASE_URL or COINGECKO_API_KEY",
    );
  }

  const url =
    baseUrl +
    "/coins/" +
    id +
    "?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      "x-cg-demo-api-key": apiKey,
    },
    next: { revalidate: 60 },
  };

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    const coin: Coin = {
      id: data.id,
      name: data.name,
      usdPrice: data.market_data.current_price.usd,
      usd24hChange: data.market_data.price_change_percentage_24h,
      usd24hHigh: data.market_data.high_24h.usd,
      usd24hLow: data.market_data.low_24h.usd,
    };

    return coin;
  } catch (error) {
    console.error("Error fetching coin details:", error);
    throw error;
  }
}
