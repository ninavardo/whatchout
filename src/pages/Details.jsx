import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { ArrowLeft, Calendar, Clock, Play, Tv } from "lucide-react";
import tmdb, { imageUrl } from "../api/tmdb";
import { formatRuntime, getYear, toCard } from "../helpers/movieHelpers";
import Loader from "../components/Loader";
import MovieGrid from "../components/MovieGrid";
import SectionTitle from "../components/SectionTitle";
import WatchlistButton from "../components/WatchlistButton";
import CastList from "../components/details/CastList";
import RatingRing from "../components/details/RatingRing";
import TrailerModal from "../components/details/TrailerModal";
import WatchProviders from "../components/details/WatchProviders";
import NotFound from "./NotFound";

const Details = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState({ key: "", data: null, error: "" });
  const [showTrailer, setShowTrailer] = useState(false);
  const isValidType = type === "movie" || type === "tv";
  const currentKey = `${type}-${id}`;

  const { scrollY } = useScroll();
  const backdropY = useTransform(scrollY, [0, 700], [0, 200]);
  const backdropScale = useTransform(scrollY, [0, 700], [1.05, 1.2]);

  useEffect(() => {
    if (!isValidType) return;
    let ignore = false;

    const fetchDetails = async () => {
      try {
        const response = await tmdb.get(`/${type}/${id}`, {
          params: { append_to_response: "credits,videos,similar,watch/providers" },
        });
        if (!ignore) {
          setResult({ key: `${type}-${id}`, data: response.data, error: "" });
        }
      } catch (error) {
        console.log(error);
        if (!ignore) {
          setResult({
            key: `${type}-${id}`,
            data: null,
            error: error.response?.status === 404 ? "notfound" : "error",
          });
        }
      }
    };

    fetchDetails();

    return () => {
      ignore = true;
    };
  }, [type, id, isValidType]);

  const closeTrailer = () => setShowTrailer(false);

  if (!isValidType || result.error === "notfound") return <NotFound />;
  if (result.key !== currentKey) return <Loader text="Getting the details..." />;

  if (result.error) {
    return (
      <div className="py-32 text-center">
        <p className="font-['Instrument_Serif',serif] text-4xl italic">Oops, something broke.</p>
        <button
          onClick={() => navigate(0)}
          className="mt-6 cursor-pointer rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-5 py-2 font-bold"
        >
          Try again
        </button>
      </div>
    );
  }

  const title = result.data;
  const name = title.title || title.name;
  const runtime = type === "movie" ? title.runtime : title.episode_run_time?.[0];
  const trailer =
    title.videos?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    ) || title.videos?.results.find((video) => video.site === "YouTube");
  const cast = title.credits?.cast.slice(0, 15) || [];
  const director = title.credits?.crew.find((person) => person.job === "Director");
  const creator = title.created_by?.[0];
  const similar = (title.similar?.results || [])
    .filter((item) => item.poster_path)
    .slice(0, 10)
    .map((item) => toCard(item, type));

  return (
    <>
      <section className="relative overflow-hidden bg-[#1E1B4B] text-[#FFF7E8]">
        {title.backdrop_path && (
          <motion.div
            style={{ y: backdropY, scale: backdropScale }}
            className="absolute inset-0"
          >
            <img
              src={imageUrl(title.backdrop_path, "w1280")}
              alt=""
              width="1280"
              height="720"
              className="h-full w-full object-cover opacity-40"
            />
          </motion.div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/70 to-[#1E1B4B]/30" />

        <div className="relative mx-auto max-w-7xl px-5 pt-8 pb-16 md:pt-12 md:pb-24">
          <button
            onClick={() => navigate(-1)}
            className="mb-10 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[#FFF7E8]/80 hover:text-[#FFD166]"
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="grid items-end gap-8 md:grid-cols-[280px_1fr] md:gap-12">
            <motion.div
              initial={{ opacity: 0, y: 40, rotate: -4 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="w-44 overflow-hidden rounded-3xl border-2 border-[#FFD166] shadow-[6px_6px_0_0_#FFD166] md:w-full"
            >
              {title.poster_path ? (
                <img
                  src={imageUrl(title.poster_path, "w500")}
                  alt={name}
                  width="500"
                  height="750"
                  className="aspect-[2/3] w-full object-cover"
                />
              ) : (
                <div className="flex aspect-[2/3] items-center justify-center bg-[#FFD166] p-4 text-center font-bold text-[#1E1B4B]">
                  {name}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2">
                {title.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="rounded-full border border-[#FFF7E8]/30 px-3 py-1 text-xs font-semibold"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>

              <h1 className="mt-4 text-5xl leading-[0.9] font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                {name}
              </h1>
              {title.tagline && (
                <p className="mt-3 font-['Instrument_Serif',serif] text-2xl text-[#FFD166] italic md:text-3xl">
                  {title.tagline}
                </p>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold">
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} />
                  {getYear(title) || "Coming soon"}
                </span>
                {runtime > 0 && (
                  <span className="flex items-center gap-1.5">
                    <Clock size={16} />
                    {formatRuntime(runtime)}
                    {type === "tv" && " per episode"}
                  </span>
                )}
                {type === "tv" && (
                  <span className="flex items-center gap-1.5">
                    <Tv size={16} />
                    {title.number_of_seasons} season
                    {title.number_of_seasons === 1 ? "" : "s"}
                  </span>
                )}
                {title.vote_count > 0 && (
                  <RatingRing rating={title.vote_average} votes={title.vote_count} />
                )}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <WatchlistButton movie={toCard(title, type)} />
                {trailer && (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowTrailer(true)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#FFF7E8] px-5 py-3 font-bold transition hover:bg-[#FFF7E8] hover:text-[#1E1B4B]"
                  >
                    <Play size={18} fill="currentColor" />
                    Watch trailer
                  </motion.button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_340px]">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-[#FF5A36] uppercase">
              The story
            </p>
            <p className="max-w-3xl text-xl leading-relaxed md:text-2xl">
              {title.overview || "No description yet."}
            </p>
            {(director || creator) && (
              <p className="mt-6 text-[#1E1B4B]/70">
                {director ? "Directed by " : "Created by "}
                <span className="font-bold text-[#1E1B4B]">
                  {(director || creator).name}
                </span>
              </p>
            )}
          </div>
          <WatchProviders providers={title["watch/providers"]?.results} />
        </div>
      </section>

      {cast.length > 0 && (
        <section className="px-5 py-10">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker="Cast" className="mb-8">
              Who's in it
            </SectionTitle>
            <CastList cast={cast} />
          </div>
        </section>
      )}

      {similar.length > 0 && (
        <section className="px-5 py-16">
          <div className="mx-auto max-w-7xl">
            <SectionTitle kicker="More like this" className="mb-10">
              If you liked <span className="font-['Instrument_Serif',serif] font-normal italic">this</span>
            </SectionTitle>
            <MovieGrid movies={similar} />
            <div className="mt-10 text-center">
              <Link
                to={`/explore?type=${type}`}
                className="font-['Instrument_Serif',serif] text-2xl italic underline decoration-[#FF5A36] decoration-2 underline-offset-8"
              >
                Explore more {type === "tv" ? "series" : "movies"}
              </Link>
            </div>
          </div>
        </section>
      )}

      <AnimatePresence>
        {showTrailer && trailer && (
          <TrailerModal videoKey={trailer.key} title={name} onClose={closeTrailer} />
        )}
      </AnimatePresence>
    </>
  );
};

export default Details;
