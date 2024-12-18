import { NextResponse } from "next/server";

const TMDB_API_BASE = "https://api.themoviedb.org/3";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const { id } = params;
  const url = new URL(request.url);
  const type = url.searchParams.get("type");

  // Validate environment variables
  if (!process.env.TMDB_API_KEY) {
    return NextResponse.json(
      { error: "TMDB_API_KEY not found in environment variables" },
      { status: 500 },
    );
  }

  if (!type || !id) {
    return NextResponse.json(
      { error: "Invalid or missing type and ID parameters" },
      { status: 400 },
    );
  }

  try {
    const apiUrl = `${TMDB_API_BASE}/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos`;
    console.log("Fetching from TMDB API:", apiUrl);

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.status_message || "Error fetching data from TMDb API",
      );
    }

    console.log("Fetched Details:", data); // Debug data
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching details:", error.message);
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
