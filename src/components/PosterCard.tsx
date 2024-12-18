import Image from "next/image";
import Link from "next/link";

interface PosterCardProps {
  id: number;
  type: "movie" | "tv";
  imageUrl: string;
  title: string;
  isRolling?: boolean;
}

export function PosterCard({
  id,
  type,
  imageUrl,
  title,
  isRolling = false,
}: PosterCardProps) {
  return (
    <Link href={`/${type}/${id}`} passHref>
      <div
        className={`flex flex-col cursor-pointer ${
          isRolling ? "w-48" : "w-40"
        }`}
      >
        <div className="relative aspect-[2/3] rounded-lg overflow-hidden border-2 border-primary hover:border-accent transition">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
            priority
          />
        </div>
        {!isRolling && (
          <p className="mt-2 text-sm font-medium text-center text-white">
            {title}
          </p>
        )}
      </div>
    </Link>
  );
}
