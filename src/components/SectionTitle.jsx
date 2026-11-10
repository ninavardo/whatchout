import { motion } from "motion/react";

const SectionTitle = ({
  kicker,
  children,
  className = "",
  kickerColor = "text-[#06A77D]",
}) => {
  return (
    <div className={className}>
      <p
        className={`mb-4 flex items-center gap-3 text-xs font-bold tracking-[0.3em] uppercase ${kickerColor}`}
      >
        <span className="h-0.5 w-8 bg-current" />
        {kicker}
      </p>
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="text-5xl leading-[0.9] font-extrabold tracking-tight md:text-7xl"
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default SectionTitle;
