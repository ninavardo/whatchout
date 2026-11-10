import { motion } from "motion/react";

const Loader = ({ text = "Looking around..." }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-32">
      <div className="flex gap-2">
        {[0, 1].map((item) => (
          <motion.span
            key={item}
            animate={{ scaleY: [1, 0.1, 1] }}
            transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 0.4 }}
            className="flex h-12 w-10 items-center justify-center rounded-full border-[3px] border-[#1E1B4B] bg-[#FFF7E8]"
          >
            <span className="h-4 w-4 rounded-full border-[3px] border-[#06A77D] bg-[#1E1B4B]" />
          </motion.span>
        ))}
      </div>
      <p className="text-2xl font-semibold">{text}</p>
    </div>
  );
};

export default Loader;
