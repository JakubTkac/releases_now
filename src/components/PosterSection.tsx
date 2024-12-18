"use client";

import { useRef } from "react";
import { PosterCard } from "./PosterCard";
import { Button } from "@/components/ui/button";

interface PosterSectionProps {
  title: string;
  posters: Array<{ id: number; imageUrl: string; title: string }>;
  type: "movie" | "tv"; // Add a type prop for poster type
}

export function PosterSection({ title, posters, type }: PosterSectionProps) {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -900, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 900, behavior: "smooth" });
  };

  return (
    <section className="py-8 relative">
      {/* Section Title */}
      <h2 className="text-2xl font-bold text-white mb-4 px-6">{title}</h2>

      {/* Scrollable Container with Navigation Arrows */}
      <div className="relative">
        {/* Left Arrow */}
        {posters.length > 6 && (
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent"
            aria-label="Scroll Left"
          >
            &#8592;
          </button>
        )}

        {/* Scrollable Poster List */}
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-auto scroll-smooth px-6 pb-4 gap-4 hide-scrollbar"
        >
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="min-w-[150px] md:min-w-[180px] lg:min-w-[200px] flex-shrink-0"
            >
              <PosterCard
                key={poster.id}
                id={poster.id}
                type={type} // Pass the type dynamically
                imageUrl={poster.imageUrl}
                title={poster.title}
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        {posters.length > 6 && (
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-accent"
            aria-label="Scroll Right"
          >
            &#8594;
          </button>
        )}
      </div>

      {/* See More Button */}
      <div className="px-6 mt-4">
        <Button
          variant="outline"
          className="w-full bg-accent text-white border-primary hover:bg-primary hover:text-accent"
        >
          See More
        </Button>
      </div>
    </section>
  );
}
