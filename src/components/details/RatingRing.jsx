import { motion } from "motion/react";

const RatingRing = ({ rating, votes }) => {
  const value = Math.round(rating * 10);

  return (
    <div className="flex items-center gap-3">
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
          <circle cx="30" cy="30" r="25" fill="#1E1B4B" stroke="#FFF7E8" strokeOpacity="0.15" strokeWidth="6" />
          <motion.circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke={value >= 70 ? "#FFD166" : "#06A77D"}
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: rating / 10 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-lg font-extrabold">
          {value}
          <span className="text-[10px]">%</span>
        </span>
      </div>
      <p className="text-sm leading-tight text-[#FFF7E8]/70">
        People liked it
        <br />
        <span className="text-[#FFF7E8]/50">{votes.toLocaleString()} votes</span>
      </p>
    </div>
  );
};

export default RatingRing;
