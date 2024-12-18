import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="w-full py-4 px-6 flex justify-between items-center bg-primary text-white">
      <Link href="/" className="text-2xl font-bold">
        Releases Now
      </Link>
      <nav className="flex items-center gap-4">
        <Link href="/watchlist" className="text-white hover:text-accent">
          Watchlist
        </Link>
        <Link href="/coming-soon" className="text-white hover:text-accent">
          Coming Soon
        </Link>
        <Button
          variant="outline"
          className="bg-secondary text-white border-accent hover:bg-accent hover:text-primary"
        >
          Register
        </Button>
        <Button
          variant="outline"
          className="text-white bg-secondary border-accent hover:bg-accent hover:text-primary"
        >
          Login
        </Button>
      </nav>
    </header>
  );
}
