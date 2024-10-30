import { getCoinDetails } from "@/actions/getCoinDetails";
import { Coin } from "@/models/coin";

global.fetch = jest.fn();
console.error = jest.fn();

process.env.COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
process.env.COINGECKO_API_KEY = "test-api-key";

describe("getCoinDetails", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should successfully fetch and transform coin details", async () => {
    const mockApiResponse = {
      id: "bitcoin",
      name: "Bitcoin",
      market_data: {
        current_price: { usd: 10000 },
        price_change_percentage_24h: 1.5,
        high_24h: { usd: 11000 },
        low_24h: { usd: 9000 },
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getCoinDetails("bitcoin");

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/coins/bitcoin"),
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({
          accept: "application/json",
          "x-cg-demo-api-key": "test-api-key",
        }),
      }),
    );

    const expectedResult: Coin = {
      id: "bitcoin",
      name: "Bitcoin",
      usdPrice: 10000,
      usd24hChange: 1.5,
      usd24hHigh: 11000,
      usd24hLow: 9000,
    };

    expect(result).toEqual(expectedResult);
  });

  it("should throw error when API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getCoinDetails("invalid-coin")).rejects.toThrow(
      "HTTP error! status: 404",
    );
  });

  it("should throw error when network request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    await expect(getCoinDetails("bitcoin")).rejects.toThrow("Network error");
  });
});
