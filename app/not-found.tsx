import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-600 mb-2">
        404 | Page not found
      </h2>
      <Link
        href={`/`}
        className="flex p-4 underline"
        aria-label="Go back to main page"
      >
        Go to Home Page
      </Link>
    </div>
  );
}
