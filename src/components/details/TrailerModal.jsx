import { useEffect } from "react";
import { motion } from "motion/react";
import { useLenis } from "lenis/react";
import { X } from "lucide-react";

const TrailerModal = ({ videoKey, title, onClose }) => {
  const lenis = useLenis();

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") onClose();
    };

    lenis?.stop();
    window.addEventListener("keydown", handleKey);

    return () => {
      lenis?.start();
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, lenis]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#1E1B4B]/90 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        onClick={(event) => event.stopPropagation()}
        className="relative w-full max-w-5xl"
      >
        <button
          onClick={onClose}
          aria-label="Close trailer"
          className="absolute -top-14 right-0 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#FFD166] text-[#1E1B4B]"
        >
          <X size={22} />
        </button>
        <div className="aspect-video overflow-hidden rounded-3xl border-2 border-[#FFD166] bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1`}
            title={`${title} trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            className="h-full w-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TrailerModal;
