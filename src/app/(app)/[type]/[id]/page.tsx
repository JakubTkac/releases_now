import { notFound } from "next/navigation";

interface Params {
  params: {
    type: "movie" | "tv";
    id: string;
  };
}

export default async function DetailsPage({ params }: Params) {
  const { type, id } = params;

  // Validate the type
  if (type !== "movie" && type !== "tv") {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    const apiUrl = `${baseUrl}/api/tmdb/details/${id}?type=${type}`;
    console.log("Fetching details from:", apiUrl); // Debug URL

    const res = await fetch(apiUrl, { cache: "no-store" });

    if (!res.ok) {
      console.error("Failed to fetch details:", res.statusText);
      notFound();
    }

    const data = await res.json();
    console.log("Fetched Full Details:", data);

    return (
      <div className="p-8 text-white bg-black min-h-screen">
        {/* Title */}
        <h1 className="text-4xl font-bold mb-4 text-primary">
          {data.title || data.name}
        </h1>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Poster */}
          <div className="w-72 flex-shrink-0">
            <img
              src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
              alt={data.title || data.name}
              className="rounded-lg shadow-lg"
            />
          </div>

          {/* Info Section */}
          <div className="flex-1">
            <p className="mb-4">
              {data.overview || "No description available."}
            </p>

            <div className="space-y-2">
              <p>
                <strong>Release Date:</strong>{" "}
                {data.release_date || data.first_air_date || "N/A"}
              </p>
              <p>
                <strong>Rating:</strong> {data.vote_average} / 10
              </p>
              <p>
                <strong>Genres:</strong>{" "}
                {data.genres?.map((genre: any) => genre.name).join(", ") ||
                  "N/A"}
              </p>
              <p>
                <strong>Status:</strong> {data.status || "N/A"}
              </p>
            </div>

            {/* Extra for TV Series */}
            {type === "tv" && (
              <div className="mt-4 space-y-2">
                <p>
                  <strong>Number of Seasons:</strong> {data.number_of_seasons}
                </p>
                <p>
                  <strong>Number of Episodes:</strong> {data.number_of_episodes}
                </p>
                {data.next_episode_to_air && (
                  <p>
                    <strong>Next Episode:</strong>{" "}
                    {data.next_episode_to_air.name} (
                    {data.next_episode_to_air.air_date})
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Cast Section */}
        {data.credits?.cast?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Cast</h2>
            <div className="flex overflow-x-auto gap-4 hide-scrollbar">
              {data.credits.cast.slice(0, 10).map((actor: any) => (
                <div key={actor.id} className="w-32 text-center">
                  <img
                    src={
                      actor.profile_path
                        ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                        : "/placeholder.svg"
                    }
                    alt={actor.name}
                    className="rounded-lg shadow-md mb-2"
                  />
                  <p className="text-sm font-medium">{actor.name}</p>
                  <p className="text-xs text-gray-400">{actor.character}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Videos Section */}
        {data.videos?.results?.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Videos</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.videos.results
                .filter((video: any) => video.site === "YouTube")
                .slice(0, 6) // Limit to 6 videos
                .map((video: any) => (
                  <div key={video.id} className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.key}`}
                      title={video.name}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full rounded-lg shadow-lg"
                    ></iframe>
                    <p className="mt-2 text-center text-sm">{video.name}</p>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  } catch (error: any) {
    console.error("Error rendering page:", error.message);
    notFound();
  }
}
