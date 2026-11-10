import { useEffect, useState } from "react";
import { Link } from "react-router";
import { ChevronDown, Loader2 } from "lucide-react";
import tmdb from "../../api/tmdb";
import sortOptions from "../../data/sortOptions";
import { getSortParams, toCard } from "../../helpers/movieHelpers";
import MovieGrid from "../MovieGrid";
import SkeletonGrid from "../SkeletonGrid";
import Eyes from "../Eyes";

const ExploreResults = ({ type, query }) => {
  const [genres, setGenres] = useState([]);
  const [genreId, setGenreId] = useState(null);
  const [sort, setSort] = useState("popular");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdb.get(`/genre/${type}/list`);
        setGenres(response.data.genres);
      } catch (err) {
        console.log(err);
      }
    };

    fetchGenres();
  }, [type]);

  useEffect(() => {
    let ignore = false;

    const fetchResults = async () => {
      try {
        const response = query
          ? await tmdb.get(`/search/${type}`, { params: { query, page } })
          : await tmdb.get(`/discover/${type}`, {
              params: {
                page,
                with_genres: genreId || undefined,
                ...getSortParams(sort, type),
              },
            });

        if (ignore) return;

        const items = response.data.results.map((item) => toCard(item, type));
        setResults((prevState) => {
          if (page === 1) return items;
          const ids = new Set(prevState.map((item) => item.id));
          return [...prevState, ...items.filter((item) => !ids.has(item.id))];
        });
        setTotalResults(response.data.total_results);
        setTotalPages(Math.min(response.data.total_pages, 500));
        setError("");
      } catch (err) {
        console.log(err);
        if (!ignore) setError("Something went wrong. Please try again.");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchResults();

    return () => {
      ignore = true;
    };
  }, [type, query, genreId, sort, page]);

  const changeGenre = (id) => {
    setGenreId(id === genreId ? null : id);
    setPage(1);
    setLoading(true);
  };

  const changeSort = (event) => {
    setSort(event.target.value);
    setPage(1);
    setLoading(true);
  };

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
    setLoading(true);
  };

  const firstLoad = loading && page === 1;

  return (
    <>
      {!query && (
        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="-mx-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-wrap lg:px-0">
            <button
              onClick={() => changeGenre(null)}
              className={`shrink-0 cursor-pointer rounded-full border-2 border-[#1E1B4B] px-4 py-1.5 text-sm font-semibold transition ${
                genreId === null ? "bg-[#1E1B4B] text-[#FFF7E8]" : "hover:bg-[#FFD166]"
              }`}
            >
              All genres
            </button>
            {genres.map((genre) => (
              <button
                key={genre.id}
                onClick={() => changeGenre(genre.id)}
                className={`shrink-0 cursor-pointer rounded-full border-2 border-[#1E1B4B] px-4 py-1.5 text-sm font-semibold transition ${
                  genreId === genre.id ? "bg-[#1E1B4B] text-[#FFF7E8]" : "hover:bg-[#FFD166]"
                }`}
              >
                {genre.name}
              </button>
            ))}
          </div>

          <label className="relative flex shrink-0 items-center gap-2 text-sm font-semibold">
            Sort by
            <select
              value={sort}
              onChange={changeSort}
              className="cursor-pointer appearance-none rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] py-1.5 pr-9 pl-4 font-bold outline-none"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3" />
          </label>
        </div>
      )}

      <p className="mt-8 mb-6 text-sm text-[#1E1B4B]/60">
        {firstLoad
          ? "Looking..."
          : `${totalResults.toLocaleString()} titles found`}
      </p>

      {error && (
        <p className="rounded-2xl border-2 border-[#FF5A36] bg-[#FF5A36]/10 p-4 font-semibold text-[#FF5A36]">
          {error}
        </p>
      )}

      {firstLoad ? (
        <SkeletonGrid />
      ) : results.length > 0 ? (
        <MovieGrid movies={results} />
      ) : (
        !error && (
          <div className="flex flex-col items-center py-20 text-center">
            <Eyes className="h-24 w-auto" />
            <p className="mt-6 font-['Instrument_Serif',serif] text-4xl italic">
              We looked everywhere...
            </p>
            <p className="mt-2 text-[#1E1B4B]/60">
              Nothing found. Check the spelling or try the other tab.
            </p>
            <Link
              to="/explore"
              className="mt-6 rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-5 py-2 font-bold"
            >
              Show me popular stuff
            </Link>
          </div>
        )
      )}

      {!firstLoad && page < totalPages && results.length > 0 && (
        <div className="mt-14 flex justify-center">
          <button
            onClick={loadMore}
            disabled={loading}
            className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] px-8 py-3 font-bold shadow-[6px_6px_0_0_#1E1B4B] transition hover:bg-[#FFD166] disabled:cursor-wait disabled:opacity-60"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Loading..." : "Show me more"}
          </button>
        </div>
      )}
    </>
  );
};

export default ExploreResults;
