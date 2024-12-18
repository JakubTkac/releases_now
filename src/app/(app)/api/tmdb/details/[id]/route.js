/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;

  if (!process.env.TMDB_API_KEY || !id) {
    return NextResponse.json(
      { error: "Missing required parameters or environment variables" },
      { status: 400 },
    );
  }

  const type = request.nextUrl.searchParams.get("type");
  if (!type) {
    return NextResponse.json(
      { error: "Type query parameter is required" },
      { status: 400 },
    );
  }

  const TMDB_API_BASE = "https://api.themoviedb.org/3";
  const apiUrl = `${TMDB_API_BASE}/${type}/${id}?api_key=${process.env.TMDB_API_KEY}&append_to_response=credits,videos`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { error: data.status_message || "Error fetching data from TMDB API" },
        { status: response.status },
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error?.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
