import { useEffect, useState } from "react";
import tmdb from "../../api/tmdb";
import { formatRuntime, toCard } from "../../helpers/movieHelpers";
import MovieCard from "../MovieCard";
import SkeletonGrid from "../SkeletonGrid";
import SectionTitle from "../SectionTitle";
import Clock from "./Clock";

const MIN = 60;
const MAX = 210;

const RuntimePicker = () => {
  const [minutes, setMinutes] = useState(100);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const response = await tmdb.get("/discover/movie", {
          params: {
            "with_runtime.gte": minutes - 25,
            "with_runtime.lte": minutes,
            "vote_count.gte": 400,
            sort_by: "popularity.desc",
          },
        });
        setMovies(
          response.data.results
            .slice(0, 6)
            .map((item) => toCard(item, "movie")),
        );
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }, 450);

    return () => clearTimeout(timer);
  }, [minutes]);

  const handleChange = (event) => {
    setMinutes(Number(event.target.value));
    setLoading(true);
  };

  const fill = ((minutes - MIN) / (MAX - MIN)) * 100;

  return (
    <section className="px-5 py-24 md:py-32">
      <div className="mx-auto max-w-7xl rounded-[2.5rem] border-2 border-[#1E1B4B] bg-[#FFD166] p-6 shadow-[6px_6px_0_0_#1E1B4B] md:p-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <div>
            <SectionTitle kicker="The time machine" kickerColor="text-[#1E1B4B]">
              How much time do you{" "}
              <span className="font-['Instrument_Serif',serif] font-normal italic">have?</span>
            </SectionTitle>
            <p className="mt-5 max-w-md text-[#1E1B4B]/70">
              Move the slider and we show movies that will end before you fall
              asleep. No more starting a 3 hour movie at midnight.
            </p>

            <div className="mt-10 flex items-center gap-6">
              <div className="h-32 w-32 shrink-0 md:h-40 md:w-40">
                <Clock minutes={minutes} />
              </div>
              <div>
                <p className="text-sm font-bold tracking-widest uppercase">
                  I've got
                </p>
                <p className="text-6xl font-extrabold tracking-tight md:text-7xl">
                  {formatRuntime(minutes)}
                </p>
              </div>
            </div>

            <label htmlFor="runtime" className="sr-only">
              Minutes you have
            </label>
            <input
              id="runtime"
              type="range"
              min={MIN}
              max={MAX}
              step="5"
              value={minutes}
              onChange={handleChange}
              className="range mt-8"
              style={{
                background: `linear-gradient(to right, #FF5A36 ${fill}%, #FFF7E8 ${fill}%)`,
              }}
            />
            <div className="mt-2 flex justify-between text-xs font-bold">
              <span>{formatRuntime(MIN)}</span>
              <span>{formatRuntime((MIN + MAX) / 2)}</span>
              <span>{formatRuntime(MAX)}</span>
            </div>
          </div>

          <div>
            {loading ? (
              <SkeletonGrid count={6} className="grid-cols-2 sm:grid-cols-3" />
            ) : movies.length > 0 ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
                {movies.map((movie, index) => (
                  <MovieCard key={movie.id} movie={movie} index={index} />
                ))}
              </div>
            ) : (
              <p className="py-20 text-center font-['Instrument_Serif',serif] text-3xl italic">
                Nothing fits in {formatRuntime(minutes)}. Try a bit more time.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RuntimePicker;
