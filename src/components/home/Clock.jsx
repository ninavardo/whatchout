import { motion } from "motion/react";

const ticks = Array.from({ length: 12 });

const Clock = ({ minutes }) => {
  const hourAngle = (minutes / 60) * 30;
  const minuteAngle = (minutes % 60) * 6;

  return (
    <svg viewBox="0 0 100 100" className="h-full w-full">
      <circle cx="50" cy="50" r="47" fill="#FFF7E8" stroke="#1E1B4B" strokeWidth="3" />
      <circle cx="50" cy="50" r="40" fill="none" stroke="#FF5A36" strokeWidth="1.5" strokeDasharray="2 4" />
      {ticks.map((_, index) => (
        <line
          key={index}
          x1="50"
          y1="8"
          x2="50"
          y2={index % 3 === 0 ? "16" : "12"}
          stroke="#1E1B4B"
          strokeWidth={index % 3 === 0 ? 3 : 1.5}
          strokeLinecap="round"
          transform={`rotate(${index * 30} 50 50)`}
        />
      ))}
      <motion.line
        x1="50"
        y1="50"
        x2="50"
        y2="28"
        stroke="#1E1B4B"
        strokeWidth="5"
        strokeLinecap="round"
        animate={{ rotate: hourAngle }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        style={{ originX: "50%", originY: "100%" }}
      />
      <motion.line
        x1="50"
        y1="50"
        x2="50"
        y2="17"
        stroke="#FF5A36"
        strokeWidth="3"
        strokeLinecap="round"
        animate={{ rotate: minuteAngle }}
        transition={{ type: "spring", stiffness: 80, damping: 12 }}
        style={{ originX: "50%", originY: "100%" }}
      />
      <circle cx="50" cy="50" r="4" fill="#FFD166" stroke="#1E1B4B" strokeWidth="2" />
    </svg>
  );
};

export default Clock;
