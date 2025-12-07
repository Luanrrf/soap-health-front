import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full h-16 bg-red-700 shadow-md flex items-center px-6 text-white">
      <div className="flex items-center gap-8 w-full">
        <Link href="/">
          <h1 className="text-xl font-bold">🍕 Red Oven Pizzeria</h1>
        </Link>

        <nav className="flex items-center gap-6 ml-auto text-sm">
          <Link href="/">
            <span className="hover:underline">Make your pizza</span>
          </Link>
          <Link href="/orders">
            <span className="hover:underline">All orders</span>
          </Link>
          <Link href="/search-order">
            <span className="hover:underline">Search any order</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
