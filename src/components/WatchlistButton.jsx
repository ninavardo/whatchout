import { useLocation, useNavigate } from "react-router";
import { motion } from "motion/react";
import { Eye, Plus } from "lucide-react";
import { useAuth } from "../context/useAuth";
import { useWatchlist } from "../context/useWatchlist";

const WatchlistButton = ({ movie, small = false }) => {
  const { user } = useAuth();
  const { isInWatchlist, toggleWatchlist } = useWatchlist();
  const navigate = useNavigate();
  const location = useLocation();
  const saved = isInWatchlist(movie.id, movie.type);

  const handleClick = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    toggleWatchlist(movie);
  };

  if (small) {
    return (
      <motion.button
        whileTap={{ scale: 0.8 }}
        onClick={handleClick}
        aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}
        title={saved ? "Remove from watchlist" : "Add to watchlist"}
        className={`flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 border-[#1E1B4B] shadow-[3px_3px_0_0_#1E1B4B] transition-colors ${
          saved ? "bg-[#FF5A36] text-[#FFF7E8]" : "bg-[#FFF7E8] text-[#1E1B4B] hover:bg-[#FFD166]"
        }`}
      >
        {saved ? <Eye size={18} /> : <Plus size={18} />}
      </motion.button>
    );
  }

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleClick}
      className={`flex cursor-pointer items-center gap-2 rounded-full border-2 border-[#1E1B4B] px-5 py-3 font-bold shadow-[3px_3px_0_0_#1E1B4B] transition-colors ${
        saved ? "bg-[#FF5A36] text-[#FFF7E8]" : "bg-[#FFD166] text-[#1E1B4B] hover:bg-[#FFF7E8]"
      }`}
    >
      {saved ? <Eye size={20} /> : <Plus size={20} />}
      {saved ? "Keeping an eye on it" : "Keep an eye on it"}
    </motion.button>
  );
};

export default WatchlistButton;
