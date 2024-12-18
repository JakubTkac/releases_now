"use client";
import { useEffect, useState } from "react";
import { RollingSection } from "@/components/RollingSection";
import { PosterSection } from "@/components/PosterSection";

export default function Home() {
  const [theaterPosters, setTheaterPosters] = useState([]);
  const [moviesPosters, setMoviesPosters] = useState([]);
  const [tvPosters, setTvPosters] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const [theaterData, moviesData, tvData] = await Promise.all([
          fetch("/api/tmdb?type=theater").then((res) => res.json()),
          fetch("/api/tmdb?type=movies").then((res) => res.json()),
          fetch("/api/tmdb?type=tv").then((res) => res.json()),
        ]);

        setTheaterPosters(theaterData);
        setMoviesPosters(moviesData);
        setTvPosters(tvData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <RollingSection />
      <PosterSection
        title="Theater Releases"
        posters={theaterPosters}
        type="movie"
      />
      <PosterSection title="Movies" posters={moviesPosters} type="movie" />
      <PosterSection title="TV Series" posters={tvPosters} type="tv" />
    </div>
  );
}
