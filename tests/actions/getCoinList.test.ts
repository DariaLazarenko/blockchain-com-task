import { getCoinList } from "@/actions/getCoinList";
import { AVAILABLE_COIN_IDS } from "@/models/availableCoinIds";
import { CoinShort } from "@/models/coin";

global.fetch = jest.fn();
console.error = jest.fn();

process.env.COINGECKO_BASE_URL = "https://api.coingecko.com/api/v3";
process.env.COINGECKO_API_KEY = "test-api-key";

describe("getCoinList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch and transform coin list data successfully", async () => {
    const mockApiResponse = {
      bitcoin: {
        usd: 10000,
        usd_24h_change: 1.5,
      },
      ethereum: {
        usd: 5000,
        usd_24h_change: -1.5,
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockApiResponse,
    });

    const result = await getCoinList();

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining("/simple/price?ids="),
      expect.objectContaining({
        method: "GET",
        headers: {
          accept: "application/json",
          "x-cg-demo-api-key": "test-api-key",
        },
        next: { revalidate: 60 },
      }),
    );

    const expectedResult: CoinShort[] = [
      {
        id: "bitcoin",
        name: "Bitcoin",
        usdPrice: 10000,
        usd24hChange: 1.5,
      },
      {
        id: "ethereum",
        name: "Ethereum",
        usdPrice: 5000,
        usd24hChange: -1.5,
      },
    ];

    expect(result).toEqual(expectedResult);
  });

  it("should throw error when API request fails", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getCoinList()).rejects.toThrow("HTTP error! status: 404");
  });

  it("should throw error when network request fails", async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(
      new Error("Network error"),
    );

    await expect(getCoinList()).rejects.toThrow("Network error");
  });

  it("should include all available coin IDs in the API request", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await getCoinList();

    const fetchCall = (global.fetch as jest.Mock).mock.calls[0][0];
    AVAILABLE_COIN_IDS.forEach((coinId) => {
      expect(fetchCall).toContain(coinId);
    });
  });
});
