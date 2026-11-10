import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Shuffle } from "lucide-react";
import tmdb from "../../api/tmdb";
import moods from "../../data/moods";
import { toCard } from "../../helpers/movieHelpers";
import MovieCard from "../MovieCard";
import SkeletonGrid from "../SkeletonGrid";
import SectionTitle from "../SectionTitle";

const MoodPicker = () => {
  const [activeMood, setActiveMood] = useState(moods[0]);
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;

    const fetchMovies = async () => {
      try {
        const response = await tmdb.get("/discover/movie", {
          params: {
            with_genres: activeMood.genres,
            sort_by: "popularity.desc",
            "vote_count.gte": 300,
            page,
          },
        });
        if (!ignore) {
          setMovies(
            response.data.results
              .slice(0, 8)
              .map((item) => toCard(item, "movie")),
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchMovies();

    return () => {
      ignore = true;
    };
  }, [activeMood, page]);

  const selectMood = (mood) => {
    if (mood.id === activeMood.id) return;
    setActiveMood(mood);
    setPage(1);
    setLoading(true);
  };

  const shuffle = () => {
    let nextPage = page;
    while (nextPage === page) {
      nextPage = Math.floor(Math.random() * 6) + 1;
    }
    setPage(nextPage);
    setLoading(true);
  };

  return (
    <section className="px-5 py-16 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle kicker="Mood board">
            What are you
            <br />
            in the <span className="text-[#06A77D]">mood</span> for?
          </SectionTitle>
          <button
            onClick={shuffle}
            className="flex w-fit cursor-pointer items-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] px-5 py-3 font-bold shadow-[3px_3px_0_0_#1E1B4B] transition hover:bg-[#FFD166]"
          >
            <Shuffle size={18} />
            Shuffle picks
          </button>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          {moods.map((mood) => {
            const Icon = mood.icon;
            const isActive = mood.id === activeMood.id;
            return (
              <button
                key={mood.id}
                onClick={() => selectMood(mood)}
                className={`relative flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#1E1B4B] px-4 py-2 font-semibold transition-colors ${
                  isActive ? "text-[#FFF7E8]" : "hover:bg-[#FFD166]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeMood"
                    className="absolute inset-0 rounded-full bg-[#1E1B4B]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon size={18} className="relative" />
                <span className="relative">{mood.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-12">
          {loading ? (
            <SkeletonGrid count={8} className="grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" />
          ) : (
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:gap-x-6 lg:grid-cols-4">
              {movies.map((movie, index) => (
                <MovieCard key={movie.id} movie={movie} index={index} />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/explore"
            className="text-2xl font-semibold underline decoration-[#06A77D] decoration-2 underline-offset-8 hover:text-[#06A77D]"
          >
            Want to dig deeper? Go to explore
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MoodPicker;
