import { useEffect, useRef } from "react";
import { Link } from "react-router";
import { motion, useMotionValue, useScroll, useTransform } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { imageUrl } from "../../api/tmdb";

const TopTen = ({ movies }) => {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const distance = useMotionValue(0);

  const { scrollYProgress } = useScroll({ target: sectionRef });
  const x = useTransform(() => -scrollYProgress.get() * distance.get());
  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measure = () => {
      distance.set(Math.max(track.scrollWidth - window.innerWidth, 0));
    };

    const observer = new ResizeObserver(measure);
    observer.observe(track);
    window.addEventListener("resize", measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [distance]);

  return (
    <section ref={sectionRef} className="relative h-[320vh] bg-[#1E1B4B] text-[#FFF7E8]">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.div ref={trackRef} style={{ x }} className="flex w-max items-end gap-6 px-5 md:gap-10 md:px-12">
          <div className="w-[80vw] shrink-0 self-center md:w-[34vw]">
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-[#FFD166] uppercase">
              Scroll, don't swipe
            </p>
            <h2 className="text-6xl leading-[0.85] font-extrabold tracking-tight md:text-8xl">
              Top 10
              <span className="block text-[#06A77D]">
                everyone's
              </span>
              watching
            </h2>
            <p className="mt-6 max-w-sm text-[#FFF7E8]/70">
              The most watched movies and shows this week. Updated every day,
              so check back soon.
            </p>
          </div>

          {movies.map((movie, index) => (
            <Link
              key={movie.id}
              to={`/title/${movie.type}/${movie.id}`}
              className="group relative w-[78vw] shrink-0 pt-16 md:w-[40vw] lg:w-[32vw]"
            >
              <span className="pointer-events-none text-transparent [-webkit-text-stroke:2px_#FFD166] absolute -top-6 -left-2 z-10 text-[9rem] leading-none font-extrabold md:-top-16 md:text-[13rem]">
                {index + 1}
              </span>
              <div className="relative aspect-video overflow-hidden rounded-3xl border-2 border-[#FFD166]">
                <img
                  src={imageUrl(movie.backdrop, "w780")}
                  alt={movie.title}
                  loading="lazy"
                  decoding="async"
                  width="780"
                  height="439"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1B4B] via-[#1E1B4B]/10 to-transparent" />
                <span className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#FFD166] text-[#1E1B4B] transition group-hover:rotate-45">
                  <ArrowUpRight size={22} />
                </span>
              </div>
              <div className="mt-4 flex items-baseline justify-between gap-4">
                <h3 className="text-2xl font-bold md:text-3xl">{movie.title}</h3>
                <span className="shrink-0 text-sm text-[#FFF7E8]/60">
                  {movie.type === "tv" ? "Series" : "Movie"} · {movie.year}
                </span>
              </div>
            </Link>
          ))}
        </motion.div>

        <div className="mx-5 mt-12 h-1 overflow-hidden rounded-full bg-[#FFF7E8]/10 md:mx-12">
          <motion.div style={{ width: barWidth }} className="h-full bg-[#06A77D]" />
        </div>
      </div>
    </section>
  );
};

export default TopTen;
