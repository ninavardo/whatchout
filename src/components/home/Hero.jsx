import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Search } from "lucide-react";
import Eyes from "../Eyes";
import RotatingBadge from "./RotatingBadge";

const quickSearches = [
  { label: "Interstellar", type: "movie" },
  { label: "Breaking Bad", type: "tv" },
  { label: "Spirited Away", type: "movie" },
  { label: "The Bear", type: "tv" },
];

const reveal = {
  hidden: { y: "110%" },
  show: (index) => ({
    y: 0,
    transition: { delay: 0.1 + index * 0.12, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Hero = () => {
  const [isTyping, setIsTyping] = useState(false);
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const titleScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const goToSearch = (query, type = "movie") => {
    navigate(`/explore?q=${encodeURIComponent(query)}&type=${type}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const value = inputRef.current.value.trim();
    if (!value) {
      inputRef.current.focus();
      return;
    }
    goToSearch(value);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-5 pt-8 pb-20 md:pt-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between text-xs font-bold tracking-[0.25em] uppercase">
          <span className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-[#FF5A36]" />
            Live from TMDB
          </span>
          <span className="hidden sm:block">Movies · Series · Tonight</span>
        </div>

        <motion.h1
          aria-label="Keep an eye out"
          style={{ y: titleY, scale: titleScale, opacity: titleOpacity }}
          className="mt-8 origin-top-left text-[19vw] leading-[0.82] font-extrabold tracking-[-0.05em] uppercase md:text-[12vw] xl:text-[10.5rem]"
        >
          <span className="block overflow-hidden pb-[0.04em]">
            <motion.span
              className="block"
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={0}
            >
              Keep an
            </motion.span>
          </span>
          <span className="flex items-center gap-[0.12em] overflow-hidden pb-[0.04em]">
            <motion.span
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={1}
              className="block"
            >
              <Eyes surprised={isTyping} className="h-[0.78em] w-auto" />
            </motion.span>
            <motion.span
              variants={reveal}
              initial="hidden"
              animate="show"
              custom={2}
              className="block"
            >
              out<span className="text-[#FF5A36]">.</span>
            </motion.span>
          </span>
        </motion.h1>

        <div className="relative z-10 mt-10 grid items-end gap-10 md:mt-14 md:grid-cols-[1.2fr_1fr]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <p className="max-w-lg font-['Instrument_Serif',serif] text-3xl leading-tight italic md:text-4xl">
              Don't know what to watch tonight? We'll keep an eye out for you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-6 flex max-w-xl items-center gap-2 rounded-full border-2 border-[#1E1B4B] bg-[#FFF7E8] p-1.5 shadow-[6px_6px_0_0_#1E1B4B]"
            >
              <Search className="ml-3 shrink-0" size={20} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search a movie..."
                aria-label="Search a movie"
                onFocus={() => setIsTyping(true)}
                onBlur={() => setIsTyping(false)}
                className="w-full bg-transparent py-2 text-lg outline-none placeholder:text-[#1E1B4B]/40"
              />
              <button
                type="submit"
                aria-label="Search"
                className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full bg-[#FF5A36] text-[#FFF7E8] transition hover:rotate-[-20deg]"
              >
                <ArrowRight size={20} />
              </button>
            </form>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
              <span className="text-[#1E1B4B]/60">People look for:</span>
              {quickSearches.map((item) => (
                <button
                  key={item.label}
                  onClick={() => goToSearch(item.label, item.type)}
                  className="cursor-pointer rounded-full border-2 border-[#1E1B4B]/20 px-3 py-1 font-semibold transition hover:border-[#1E1B4B] hover:bg-[#FFD166]"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -40 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 120 }}
            className="hidden justify-self-end md:block"
          >
            <RotatingBadge className="h-44 w-44 lg:h-52 lg:w-52" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
