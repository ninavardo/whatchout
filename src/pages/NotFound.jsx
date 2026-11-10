import { Link } from "react-router";
import { motion } from "motion/react";
import Eyes from "../components/Eyes";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center px-5 py-24 text-center">
      <motion.div
        animate={{ rotate: [0, -8, 8, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <Eyes className="h-32 w-auto md:h-40" surprised />
      </motion.div>
      <h1 className="mt-6 text-[9rem] leading-none font-extrabold tracking-tighter md:text-[13rem]">
        4<span className="text-[#06A77D]">0</span>4
      </h1>
      <p className="text-3xl font-semibold md:text-4xl">
        We kept an eye out, but this page is not here.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full border-2 border-[#1E1B4B] bg-[#FFD166] px-6 py-3 font-bold shadow-[3px_3px_0_0_#1E1B4B] transition hover:bg-[#06A77D] hover:text-[#FFF7E8]"
      >
        Take me home
      </Link>
    </div>
  );
};

export default NotFound;
