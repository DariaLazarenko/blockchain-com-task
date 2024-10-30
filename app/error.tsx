"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-full flex flex-col justify-center items-center p-4">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-red-500 mb-4">
        Something went wrong: {error.message}
      </h2>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
      >
        Try again
      </button>
    </div>
  );
}
