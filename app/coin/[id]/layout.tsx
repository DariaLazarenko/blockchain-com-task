import Link from "next/link";

export default function CoinDetailsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <Link
        href={`/`}
        className="flex p-4 underline"
        aria-label={`Go back to main page`}
      >
        Go Back
      </Link>
      {children}
    </div>
  );
}
