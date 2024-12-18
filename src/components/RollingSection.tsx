"use client";

import { useRef, useEffect } from "react";
import { PosterCard } from "./PosterCard";

const posters = [
  {
    id: 1,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 1",
  },
  {
    id: 2,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 2",
  },
  {
    id: 3,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 3",
  },
  {
    id: 4,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 4",
  },
  {
    id: 5,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 5",
  },
  {
    id: 6,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 6",
  },
  {
    id: 7,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 7",
  },
  {
    id: 8,
    imageUrl: "/placeholder.svg?height=300&width=200",
    title: "Movie 8",
  },
];

export function RollingSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      const scroll = () => {
        scrollElement.scrollLeft += 1;
        if (scrollElement.scrollLeft >= scrollElement.scrollWidth / 2) {
          scrollElement.scrollLeft = 0;
        }
      };
      const intervalId = setInterval(scroll, 30);
      return () => clearInterval(intervalId);
    }
  }, []);

  return (
    <div className="w-full overflow-hidden bg-secondary py-8">
      <div ref={scrollRef} className="flex whitespace-nowrap">
        {[...posters, ...posters].map((poster, index) => (
          <div key={`${poster.id}-${index}`} className="inline-block mx-2">
            <PosterCard
              imageUrl={poster.imageUrl}
              title={poster.title}
              isRolling
            />
          </div>
        ))}
      </div>
    </div>
  );
}
