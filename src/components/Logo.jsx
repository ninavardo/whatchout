import { Link } from "react-router";
import icon from "../assets/watchout-icon.png";

const Logo = ({ light = false, onClick }) => {
  return (
    <Link
      to="/"
      onClick={onClick}
      className="group flex items-center gap-2"
      aria-label="watchout home"
    >
      <img
        src={icon}
        alt=""
        width="36"
        height="36"
        className="h-9 w-auto transition-transform duration-300 group-hover:-rotate-12"
      />
      <span
        className={`text-2xl font-extrabold tracking-tight ${
          light ? "text-[#FFF7E8]" : "text-[#1E1B4B]"
        }`}
      >
        watch<span className="text-[#06A77D]">out</span>
      </span>
    </Link>
  );
};

export default Logo;
