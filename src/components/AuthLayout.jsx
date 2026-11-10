import { motion } from "motion/react";
import Eyes from "./Eyes";
import Logo from "./Logo";

const AuthLayout = ({ title, subtitle, eyesClosed, children }) => {
  return (
    <div className="px-5 py-10 md:py-16">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-[2.5rem] border-2 border-[#1E1B4B] bg-[#FFF7E8] shadow-[6px_6px_0_0_#1E1B4B] lg:grid-cols-2">
        <div className="relative flex flex-col justify-between gap-10 overflow-hidden bg-[#1E1B4B] p-8 text-[#FFF7E8] md:p-12">
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#06A77D]/20" />
          <p className="relative text-xs font-bold tracking-[0.3em] text-[#FFD166] uppercase">
            watchout account
          </p>
          <div className="relative">
            <Eyes closed={eyesClosed} className="h-24 w-auto md:h-32" />
            <h1 className="mt-8 text-5xl leading-[0.9] font-extrabold tracking-tight md:text-6xl">
              {title}
            </h1>
            <p className="mt-4 max-w-sm text-2xl text-[#FFF7E8]/80 font-semibold">
              {subtitle}
            </p>
          </div>
          <p className="relative text-sm text-[#FFF7E8]/50">
            {eyesClosed ? "Don't worry, we're not looking." : "Your watchlist is saved in your account."}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="p-6 md:p-12"
        >
          <div className="mb-6 w-fit">
            <Logo />
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthLayout;
