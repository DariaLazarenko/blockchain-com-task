import { AVAILABLE_CRYPTO_IDS } from "@/models/availableCryptoIds";
import { CryptocurrencyShort } from "@/models/cryptocurrency";

interface CryptocurrencyListApiResponse {
  [key: string]: {
    usd: number;
    usd_24h_change: number;
  };
}

/**
 * Fetches current price and 24-hour price change data for a predefined list of cryptocurrencies
 * from the CoinGecko API.
 * @returns {Promise<CryptocurrencyShort[]>} Promise that resolves to an array of cryptocurrency objects containing ID, name, USD price, and 24-hour USD price change percentage
 * @throws Error If the API request fails
 */
export async function getCryptocurrencyList(): Promise<CryptocurrencyShort[]> {
  const url =
    process.env.COINGECKO_BASE_URL +
    "/simple/price?ids=" +
    AVAILABLE_CRYPTO_IDS.join(",") +
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

    const data: CryptocurrencyListApiResponse = await response.json();
    console.log(data);

    return Object.entries(data).map(([id, values]) => ({
      id,
      name: id.charAt(0).toUpperCase() + id.slice(1),
      usdPrice: values.usd,
      usd24hChange: values.usd_24h_change,
    }));
  } catch (error) {
    console.error("Error fetching crypto data:", error);
    throw error;
  }
}
