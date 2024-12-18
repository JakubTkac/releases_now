"use client";

import { useEffect, useState } from "react";
import { PosterSection } from "@/components/PosterSection";

export default function ComingSoon() {
  const [theaterReleases, setTheaterReleases] = useState([]);
  const [digitalReleases, setDigitalReleases] = useState([]);
  const [tvEpisodes, setTvEpisodes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/tmdb/coming-soon");
        const data = await response.json();

        setTheaterReleases(data.theaterReleases || []);
        setDigitalReleases(data.digitalReleases || []);
        setTvEpisodes(data.tvEpisodes || []);
      } catch (error) {
        console.error("Error fetching coming soon data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="p-8 space-y-8">
      <PosterSection
        title="Theater Releases (Coming Soon)"
        posters={theaterReleases}
        type="movie"
      />
      <PosterSection
        title="Digital Movie Releases (Coming Soon)"
        posters={digitalReleases}
        type="movie"
      />
      <PosterSection
        title="TV Series Episodes (Coming Soon)"
        posters={tvEpisodes}
        type="tv"
      />
    </div>
  );
}
