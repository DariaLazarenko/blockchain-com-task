import Link from "next/link";

export default function CoinDetailsPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <Link
          href={`/`}
          className=" underline"
          aria-label="Go back to main page"
        >
          Go Back
        </Link>
      </div>
      {children}
    </div>
  );
}
