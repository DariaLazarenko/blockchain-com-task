"use client";

import { Coin } from "@/models/coin";
import { useEffect, useState } from "react";
import PriceInfoItem from "./PriceInfoItem";
import { getCoinDetails } from "@/actions/getCoinDetails";
import EmptyState from "./EmptyState";

const TIMEOUT_S = 60;
const ONE_SECOND = 1000;
const TIMEOUT_MS = TIMEOUT_S * ONE_SECOND;

interface Props {
  coinId: string;
  initialData: Coin;
}

export default function CoinDetails({ coinId, initialData }: Props) {
  const [data, setData] = useState(initialData);
  const [timeUntilRefetch, setTimeUntilRefetch] = useState(TIMEOUT_S);

  useEffect(() => {
    const fetchInterval = setInterval(async () => {
      const response = await getCoinDetails(coinId);
      setData(response);
      setTimeUntilRefetch(TIMEOUT_S);
    }, TIMEOUT_MS);

    const timerInterval = setInterval(() => {
      setTimeUntilRefetch((prev) => (prev > 0 ? prev - 1 : 0));
    }, ONE_SECOND);

    return () => {
      clearInterval(fetchInterval);
      clearInterval(timerInterval);
    };
  }, [coinId]);

  if (!data) {
    return (
      <div className="flex flex-1 justify-center items-center">
        <EmptyState />
      </div>
    );
  }

  return (
    <div className="p-8 flex justify-center">
      <div className="flex flex-1 flex-col max-w-sm sm:max-w-lg">
        <div className="flex flex-1 flex-col sm:flex-row justify-between sm:items-center mb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-center">
            {data.name}
          </h1>
          <div className="flex justify-center gap-1">
            <p className="text-md text-gray-600">Will update in</p>
            <p className="text-md text-gray-600 w-8">{timeUntilRefetch}s</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-xl p-4 sm:p-6">
          <div className="flex flex-col gap-6">
            <PriceInfoItem
              label="Current Price"
              value={data.usdPrice}
              prefix="$"
            />
            <PriceInfoItem
              label="24h High"
              value={data.usd24hHigh}
              prefix="$"
            />
            <PriceInfoItem label="24h Low" value={data.usd24hLow} prefix="$" />
          </div>
        </div>
      </div>
    </div>
  );
}
