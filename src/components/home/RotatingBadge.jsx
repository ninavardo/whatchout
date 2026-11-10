import { motion, useScroll, useTransform } from "motion/react";
import icon from "../../assets/watchout-icon.png";

const RotatingBadge = ({ className = "" }) => {
  const { scrollY } = useScroll();
  const rotate = useTransform(scrollY, [0, 1200], [0, 360]);

  return (
    <div className={`relative ${className}`}>
      <motion.svg style={{ rotate }} viewBox="0 0 200 200" className="h-full w-full">
        <defs>
          <path
            id="badgeCircle"
            d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
          />
        </defs>
        <circle cx="100" cy="100" r="97" fill="#FFD166" stroke="#1E1B4B" strokeWidth="3" />
        <text
          fill="#1E1B4B"
          fontSize="17"
          fontWeight="800"
          letterSpacing="3.5"
          className="uppercase"
        >
          <textPath href="#badgeCircle" textLength="460" lengthAdjust="spacing">
            keep an eye out ✺ watchout ✺ pick something ✺
          </textPath>
        </text>
      </motion.svg>
      <img
        src={icon}
        alt=""
        width="60"
        height="60"
        className="absolute top-1/2 left-1/2 h-[30%] w-auto -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
};

export default RotatingBadge;
