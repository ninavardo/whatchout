import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Dices, Star } from "lucide-react";
import tmdb, { imageUrl } from "../../api/tmdb";
import { toCard } from "../../helpers/movieHelpers";

const Roulette = () => {
  const [pick, setPick] = useState(null);
  const [overview, setOverview] = useState("");
  const [spinning, setSpinning] = useState(false);
  const [error, setError] = useState("");
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);
    setError("");

    try {
      const page = Math.floor(Math.random() * 15) + 1;
      const response = await tmdb.get("/movie/top_rated", {
        params: { page },
      });
      const list = response.data.results.filter((item) => item.poster_path);
      const winner = list[Math.floor(Math.random() * list.length)];
      let ticks = 0;

      intervalRef.current = setInterval(() => {
        ticks++;
        if (ticks >= 14) {
          clearInterval(intervalRef.current);
          setPick(toCard(winner, "movie"));
          setOverview(winner.overview);
          setSpinning(false);
          return;
        }
        const random = list[Math.floor(Math.random() * list.length)];
        setPick(toCard(random, "movie"));
      }, 90);
    } catch (err) {
      console.log(err);
      setError("The wheel got stuck. Try one more time.");
      setSpinning(false);
    }
  };

  return (
    <section className="px-5 py-16 md:py-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-[#06A77D] p-6 text-[#FFF7E8] md:p-14">
        <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full border-[40px] border-[#FFD166]/30" />
        <div className="relative grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="mb-4 text-xs font-bold tracking-[0.3em] text-[#FFD166] uppercase">
              Last resort
            </p>
            <h2 className="text-5xl leading-[0.9] font-extrabold tracking-tight md:text-7xl">
              Still can't decide?
              <span className="block text-[#1E1B4B]">
                Let luck pick.
              </span>
            </h2>
            <p className="mt-6 max-w-md text-[#FFF7E8]/85">
              Spin it and watch whatever lands. Every pick comes from the top
              rated movies, so there is no way it is bad. No take backs!
            </p>
            <motion.button
              whileTap={{ scale: 0.93 }}
              onClick={spin}
              disabled={spinning}
              className="mt-8 flex cursor-pointer items-center gap-3 rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-7 py-4 text-lg font-extrabold text-[#1E1B4B] shadow-[6px_6px_0_0_#1E1B4B] transition disabled:cursor-wait"
            >
              <motion.span
                animate={spinning ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  spinning
                    ? { repeat: Infinity, duration: 0.5, ease: "linear" }
                    : { duration: 0.2 }
                }
              >
                <Dices size={24} />
              </motion.span>
              {spinning ? "Spinning..." : pick ? "Spin again" : "Spin it"}
            </motion.button>
            {error && <p className="mt-4 font-semibold text-[#1E1B4B]">{error}</p>}
          </div>

          <div className="flex justify-center">
            <div className="relative w-56 perspective-[1000px] md:w-72">
              <AnimatePresence mode="popLayout">
                {pick ? (
                  <motion.div
                    key={pick.id}
                    initial={{ rotateY: -90, opacity: 0 }}
                    animate={{ rotateY: 0, opacity: 1 }}
                    exit={{ rotateY: 90, opacity: 0 }}
                    transition={{ duration: spinning ? 0.07 : 0.4 }}
                    className="overflow-hidden rounded-3xl border-2 border-[#1E1B4B] bg-[#FFF7E8] text-[#1E1B4B] shadow-[6px_6px_0_0_#1E1B4B]"
                  >
                    <img
                      src={imageUrl(pick.poster, "w342")}
                      alt={pick.title}
                      width="342"
                      height="513"
                      className="aspect-[2/3] w-full object-cover"
                    />
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    exit={{ rotateY: 90, opacity: 0 }}
                    className="flex aspect-[2/3] items-center justify-center rounded-3xl border-2 border-dashed border-[#FFF7E8]/70 text-center text-3xl font-semibold"
                  >
                    ?
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {pick && !spinning && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="relative mt-10 flex flex-col gap-4 rounded-3xl border-2 border-[#1E1B4B] bg-[#FFF7E8] p-5 text-[#1E1B4B] md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="flex items-center gap-2 text-sm font-bold">
                  <Star size={14} fill="currentColor" className="text-[#06A77D]" />
                  {pick.rating.toFixed(1)} · {pick.year}
                </p>
                <h3 className="text-3xl font-extrabold">{pick.title}</h3>
                <p className="mt-1 line-clamp-2 max-w-2xl text-sm text-[#1E1B4B]/70">
                  {overview}
                </p>
              </div>
              <Link
                to={`/title/movie/${pick.id}`}
                className="flex shrink-0 items-center gap-2 rounded-full bg-[#1E1B4B] px-5 py-3 font-bold text-[#FFF7E8] transition hover:bg-[#06A77D]"
              >
                See the movie
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Roulette;
