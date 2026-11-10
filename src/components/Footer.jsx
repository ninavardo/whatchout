import { useRef } from "react";
import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import geolabLogo from "../assets/geolab-logo.png";

const Footer = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);

  return (
    <footer ref={ref} className="relative mt-24 overflow-hidden bg-[#1E1B4B] text-[#FFF7E8]">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 pt-16 pb-10 md:grid-cols-3">
        <div>
          <p className="font-['Instrument_Serif',serif] text-4xl leading-tight italic">
            Less scrolling,
            <br />
            more <span className="text-[#FF5A36]">watching.</span>
          </p>
          <p className="mt-4 max-w-xs text-sm text-[#FFF7E8]/60">
            watchout helps you find something good to watch tonight, by mood,
            by time or just by luck.
          </p>
        </div>

        <nav className="flex flex-col gap-2 text-lg font-semibold">
          <p className="mb-2 text-xs tracking-[0.3em] text-[#FFD166] uppercase">
            Pages
          </p>
          <Link to="/" className="w-fit hover:text-[#FF5A36]">
            Home
          </Link>
          <Link to="/explore" className="w-fit hover:text-[#FF5A36]">
            Explore
          </Link>
          <Link to="/watchlist" className="w-fit hover:text-[#FF5A36]">
            My watchlist
          </Link>
          <Link to="/register" className="w-fit hover:text-[#FF5A36]">
            Create account
          </Link>
        </nav>

        <div>
          <p className="mb-4 text-xs tracking-[0.3em] text-[#FFD166] uppercase">
            Made at
          </p>
          <a
            href="https://geolab.edu.ge"
            target="_blank"
            rel="noreferrer"
            aria-label="Go to Geolab website"
            className="inline-flex items-center gap-4 rounded-2xl border-2 border-[#FFF7E8]/20 p-4 transition hover:border-[#FFD166]"
          >
            <img
              src={geolabLogo}
              alt="Geolab logo"
              width="47"
              height="64"
              loading="lazy"
              className="h-16 w-auto"
            />
            <span className="text-sm text-[#FFF7E8]/70">
              React course
              <br />
              final project
            </span>
          </a>
        </div>
      </div>

      <motion.p
        style={{ x }}
        aria-hidden="true"
        className="text-[24vw] leading-[0.8] font-extrabold tracking-tighter whitespace-nowrap text-[#FFF7E8]/10 select-none"
      >
        watch<span className="text-[#FF5A36]/40">out</span>
      </motion.p>

      <div className="border-t border-[#FFF7E8]/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-[#FFF7E8]/50 md:flex-row md:justify-between">
          <p>© {new Date().getFullYear()} watchout. Made by Nina.</p>
          <p>
            Movie data from TMDB. This product uses the TMDB API but is not
            endorsed or certified by TMDB.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
