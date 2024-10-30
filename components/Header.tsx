import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white shadow-md p-4">
      <Link
        href={`/`}
        className="text-black text-lg"
        aria-label="Go to main page"
      >
        Blockchain.com
      </Link>
    </header>
  );
}
