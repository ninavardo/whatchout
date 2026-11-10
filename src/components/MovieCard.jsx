import { Link } from "react-router";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { imageUrl } from "../api/tmdb";
import WatchlistButton from "./WatchlistButton";

const MovieCard = ({ movie, index = 0 }) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.07 }}
      whileHover={{ y: -6, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
      className="group relative"
    >
      <Link to={`/title/${movie.type}/${movie.id}`} className="block">
        <div className="aspect-[2/3] overflow-hidden rounded-2xl border-2 border-[#1E1B4B] bg-[#1E1B4B]/10 shadow-[3px_3px_0_0_#1E1B4B] transition-shadow duration-300 group-hover:shadow-[6px_6px_0_0_#1E1B4B]">
          {movie.poster ? (
            <img
              src={imageUrl(movie.poster, "w342")}
              alt={movie.title}
              loading="lazy"
              decoding="async"
              width="342"
              height="513"
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[#FFD166] p-4 text-center font-bold">
              {movie.title}
            </div>
          )}
        </div>
        <div className="mt-3 flex items-start justify-between gap-2">
          <h3 className="line-clamp-2 leading-tight font-bold">{movie.title}</h3>
          {movie.rating > 0 && (
            <span className="flex shrink-0 items-center gap-1 rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-2 text-xs font-bold">
              <Star size={11} fill="currentColor" />
              {movie.rating.toFixed(1)}
            </span>
          )}
        </div>
        <p className="mt-0.5 text-sm text-[#1E1B4B]/60">
          {movie.year || "Soon"} · {movie.type === "tv" ? "Series" : "Movie"}
        </p>
      </Link>
      <div className="absolute top-2 right-2">
        <WatchlistButton movie={movie} small />
      </div>
    </motion.article>
  );
};

export default MovieCard;
