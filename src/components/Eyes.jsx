import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

const eyes = [35, 105];

const Eyes = ({ className = "", closed = false, surprised = false }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const pupilX = useSpring(x, { stiffness: 200, damping: 18 });
  const pupilY = useSpring(y, { stiffness: 200, damping: 18 });

  useEffect(() => {
    const handleMove = (event) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const dx = event.clientX - (rect.left + rect.width / 2);
      const dy = event.clientY - (rect.top + rect.height / 2);
      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy) / 25, 9);
      x.set(Math.cos(angle) * distance);
      y.set(Math.sin(angle) * distance);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [x, y]);

  return (
    <svg
      ref={ref}
      viewBox="0 0 140 72"
      className={className}
      role="img"
      aria-label="two eyes"
    >
      <motion.g
        animate={{ y: surprised ? -6 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
      >
        {eyes.map((cx) => (
          <rect
            key={cx}
            x={cx - 16}
            y="2"
            width="32"
            height="6"
            rx="3"
            fill="#FFD166"
            stroke="#1E1B4B"
            strokeWidth="2"
          />
        ))}
      </motion.g>

      <motion.g
        animate={closed ? { scaleY: 0.08 } : { scaleY: [1, 1, 0.08, 1] }}
        transition={
          closed
            ? { duration: 0.2 }
            : { duration: 4.5, times: [0, 0.92, 0.96, 1], repeat: Infinity }
        }
      >
        {eyes.map((cx) => (
          <g key={cx}>
            <ellipse
              cx={cx}
              cy="42"
              rx="27"
              ry="28"
              fill="#FFF7E8"
              stroke="#1E1B4B"
              strokeWidth="4"
            />
            <motion.g style={{ x: pupilX, y: pupilY }}>
              <g transform={`translate(${cx} 42)`}>
                <circle r="13" fill="#06A77D" />
                <circle r="9" fill="#1E1B4B" />
                <line y1="0" y2="-6" stroke="#FFD166" strokeWidth="2" strokeLinecap="round">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="360 0 0"
                    dur="10s"
                    repeatCount="indefinite"
                  />
                </line>
                <line x1="0" x2="4" stroke="#FFD166" strokeWidth="2" strokeLinecap="round">
                  <animateTransform
                    attributeName="transform"
                    type="rotate"
                    from="0 0 0"
                    to="360 0 0"
                    dur="60s"
                    repeatCount="indefinite"
                  />
                </line>
                <circle cx="-4" cy="-5" r="2.5" fill="#FFF7E8" />
              </g>
            </motion.g>
          </g>
        ))}
      </motion.g>
    </svg>
  );
};

export default Eyes;
