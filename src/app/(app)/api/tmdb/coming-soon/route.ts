import { NextResponse } from "next/server";

const TMDB_API_BASE = "https://api.themoviedb.org/3";

const formatDate = (date: Date) => date.toISOString().split("T")[0];

export async function GET() {
  const today = new Date();
  const tomorrow = new Date(today);
  const nextWeek = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  nextWeek.setDate(today.getDate() + 7);

  const queryParamsTheater = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    "primary_release_date.gte": formatDate(tomorrow),
    "primary_release_date.lte": formatDate(nextWeek),
    with_release_type: "3", // Theatrical releases
    region: "US",
    sort_by: "primary_release_date.asc",
  });

  const queryParamsDigital = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    "primary_release_date.gte": formatDate(tomorrow),
    "primary_release_date.lte": formatDate(nextWeek),
    with_release_type: "4|5", // Digital releases
    sort_by: "primary_release_date.asc",
  });

  const queryParamsTV = new URLSearchParams({
    api_key: process.env.TMDB_API_KEY!,
    "air_date.gte": formatDate(tomorrow),
    region: "US",
    sort_by: "air_date.asc",
  });

  const fetchCategory = async (endpoint: string, params: URLSearchParams) => {
    const url = `${TMDB_API_BASE}${endpoint}?${params}`;
    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        console.error("TMDB API Error:", data);
        throw new Error(
          data.status_message || "Error fetching data from TMDb API",
        );
      }

      return data.results.map((item: any) => ({
        id: item.id,
        imageUrl: item.poster_path
          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
          : "/placeholder.svg?height=300&width=200", // Fallback placeholder
        title: item.title || item.name || "Untitled",
      }));
    } catch (error: any) {
      console.error("Fetch Error:", error.message);
      return [];
    }
  };

  const [theaterReleases, digitalReleases, tvEpisodes] = await Promise.all([
    fetchCategory("/discover/movie", queryParamsTheater),
    fetchCategory("/discover/movie", queryParamsDigital),
    fetchCategory("/tv/airing_today", queryParamsTV),
  ]);

  return NextResponse.json({ theaterReleases, digitalReleases, tvEpisodes });
}
