import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { imageUrl } from "../../api/tmdb";

const strip = "Trending this week ✺ Keep an eye out ✺ Don't miss it ✺ ";

const PosterMarquee = ({ movies }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const toLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const toRight = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  const half = Math.ceil(movies.length / 2);
  const rows = [movies.slice(0, half), movies.slice(half)];

  return (
    <section ref={ref} className="relative overflow-hidden py-16 md:py-24">
      <div className="-mx-10 -rotate-3 border-y-2 border-[#1E1B4B] bg-[#1E1B4B] py-3 text-[#FFD166]">
        <div className="flex w-max animate-[marquee_28s_linear_infinite]">
          {[0, 1].map((item) => (
            <span
              key={item}
              className="pr-4 text-2xl font-extrabold tracking-tight whitespace-nowrap uppercase md:text-4xl"
            >
              {strip.repeat(3)}
            </span>
          ))}
        </div>
      </div>

      <div className="-mx-10 mt-12 -rotate-3 space-y-5">
        {rows.map((row, rowIndex) => (
          <motion.div
            key={rowIndex}
            style={{ x: rowIndex === 0 ? toLeft : toRight }}
            className="flex w-max gap-4 md:gap-6"
          >
            {[...row, ...row].map((movie, index) => (
              <Link
                key={`${movie.id}-${index}`}
                to={`/title/${movie.type}/${movie.id}`}
                className="group relative w-28 shrink-0 overflow-hidden rounded-xl border-2 border-[#1E1B4B] md:w-44"
              >
                <img
                  src={imageUrl(movie.poster, "w185")}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  width="185"
                  height="278"
                  className="aspect-[2/3] w-full object-cover transition duration-500 group-hover:scale-110 group-hover:rotate-2"
                />
                <span className="absolute inset-x-0 bottom-0 translate-y-full bg-[#FF5A36] p-2 text-xs font-bold text-[#FFF7E8] transition group-hover:translate-y-0">
                  {movie.title}
                </span>
              </Link>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default PosterMarquee;
