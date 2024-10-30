export interface CoinShort {
  id: string;
  name: string;
  usdPrice: number;
  usd24hChange: number;
}

export interface Coin extends CoinShort {
  usd24hHigh: number;
  usd24hLow: number;
}
