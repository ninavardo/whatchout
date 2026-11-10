export function formatRuntime(minutes) {
  if (!minutes || minutes < 1) return "unknown";

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hours === 0) return `${mins}m`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}m`;
}

export function getYear(item) {
  const date = item.release_date || item.first_air_date || "";
  return date.slice(0, 4);
}

export function toCard(item, fallbackType = "movie") {
  return {
    id: item.id,
    type: item.media_type || fallbackType,
    title: item.title || item.name,
    poster: item.poster_path,
    backdrop: item.backdrop_path,
    year: getYear(item),
    rating: item.vote_average || 0,
  };
}

export function getSortParams(sort, type) {
  const today = new Date().toISOString().slice(0, 10);

  if (sort === "rated") {
    return { sort_by: "vote_average.desc", "vote_count.gte": 1000 };
  }

  if (sort === "new") {
    return type === "movie"
      ? {
          sort_by: "primary_release_date.desc",
          "primary_release_date.lte": today,
          "vote_count.gte": 50,
        }
      : {
          sort_by: "first_air_date.desc",
          "first_air_date.lte": today,
          "vote_count.gte": 50,
        };
  }

  return { sort_by: "popularity.desc" };
}
