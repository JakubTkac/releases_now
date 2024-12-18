import { NextResponse } from "next/server";

const TMDB_API_BASE = "https://api.themoviedb.org/3";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");

  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB_API_KEY not found in environment variables" },
      { status: 500 },
    );
  }

  let endpoint = "";
  let params = "";

  const today = new Date();
  const tomorrow = new Date(today);

  tomorrow.setDate(today.getDate() + 1);
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  if (type === "theater") {
    endpoint = "/movie/now_playing";
    params = `&release_date.gte=${formatDate(tomorrow)}`; // Theater releases from tomorrow
  } else if (type === "movies") {
    endpoint = "/movie/popular";
    params = ""; // Keep original for digital
  } else if (type === "tv") {
    endpoint = "/tv/airing_today";
    params = "&region=US"; // US region
  } else {
    return NextResponse.json(
      { error: "Invalid type parameter" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `${TMDB_API_BASE}${endpoint}?api_key=${process.env.TMDB_API_KEY}${params}`,
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.status_message || "Error fetching data from TMDb API",
      );
    }

    const formattedData = data.results.map((item: any) => ({
      id: item.id,
      imageUrl: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : "/placeholder.svg?height=300&width=200", // Fallback placeholder
      title: item.title || item.name || "Untitled",
    }));

    return NextResponse.json(formattedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
